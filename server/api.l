# api.l - api endpoints and data structures

#####################
# user
(class +User +Entity)

(rel id (+Key +Number))          # id number
(rel nm (+Ref +String))
(rel em (+Ref +String))          # email
(rel pw (+Swap +String))         # password

(rel created (+Ref +String))     # creation timestamp
(rel confirmationNumber (+String))
(rel confirmed (+Ref +Bool))     # confirmed human?

# list of memorials created by user
(rel memorials (+List +Joint) usr (+Memorial))

(rel img (+Blob))                # avatar image

(dm json> ()
   (list
      (cons "user"
         (make
            # name
            (if (: nm) (link (cons "name" @)))
            (if (: img) (link (cons "img" (pack *API (blob This 'img)))))
            # email
            (link (cons "email" (: em)))
            # confirmed?
            (link (cons "confirmed" (if (: confirmed) "true" "false")))
            # memorials
            # NOTE - a lot of nested make/link'ing here
            (link
               (make (link "memorials" T)
                  (for M (: memorials)
                     (link (jsonAll> M)) ) ) ) ) ) ) )


(allow "!updUserAvatar")
(de updUserAvatar ()
   (msg "!updUserAvatar")
   (if (db 'id '+User (getJWT "sub" "loginToken"))
      (prog
         (put!> @ 'img T)
         (pipe
            # send to base64 utility to decode
            (out '(base64 "-d") (prin (posted "image")))
            # write decoded image to db blob file
            (out (blob @ 'img) (echo)) )
         (respondJson (list (cons "Yep" "User Avatar Updated"))) )
      (respondJsonError "Unable to update user avatar") ) )

############

#########################
#  +Memorial
(class +Memorial +Entity)

(rel usr (+Joint) memorials (+User))   # created by user

(rel id (+Key +Number))                # unique memorial id number
# (rel canPost (+List +Number))          # list of user id's that can add content
# (rel canEdit (+List +Number))          # list of user id's that can edit content
(rel urlStr (+Ref +String))            # 8 char base64 string, e.g. "8bez73Ka"
(rel urlNm (+Ref +String))             # concatenated name, e.g. "MichaelJFox"

(rel invite.txt (+Blob))               # invitation text (for web app display/editing)
(rel invite.md (+Blob))                # invitation markdown (for email sending)
(rel emails (+List +String))           # list of emails (people to invite 
                                       # to contribute to memorial)

(rel nm (+Idx +String))                # full name with spaces, e.g. "Michael J Fox"
(rel nm1 (+Idx +String))               # first name, e.g. "Michael"
(rel nm2 (+String))                    # middle name or initial, e.g. "J"
(rel nm3 (+Idx +String))               # last name, e.g. "Fox"
(rel born (+Ref +String))              # date of birth
(rel died (+Ref +String))              # date of passing
(rel img (+Blob))                      # memorial avatar

# links to chronicle data
# a chronicle is simply a list of '+Chronicle's
(rel chronicle (+List +Joint) memorial (+Chronicle))

# generates a random 8 character string, with no bad words in it ;)
(de genUrlStr ()
   (let Str (fmt64 (rand 10000000000000 99999999999999))
      (ifn (hasBadWord Str)
         Str
         (genUrlStr) ) ) )

(setq *BadWords
   (list ":" ";"
      # add bad words here!
      "shit" "fart" "ass" "piss" "cock" "cunt" "fuck"
      ) )

(de hasBadWord (Str)
   (when (trim (mapcar '((W) (sub? W Str)) *BadWords))
      Str ) )


# gathers all chronicle entries
(dm jsonAll> ()
   (make
      (link (cons "urlNm" (: urlNm)))
      (link (cons "urlStr" (: urlStr)))
      (link (cons "nm" (: nm)))
      (link (cons "nm1" (: nm1)))
      (if (: nm2) (link (cons "nm2" @)))
      (if (: nm3) (link (cons "nm3" @)))
      (if (: born) (link (cons "born" @)))
      (if (: died) (link (cons "died" @)))
      (if (: img) (link (cons "avatar" (pack *API (blob This 'img)))))
      (if (: emails) 
         (link
            (make (link "emails" T)
               (for E (: emails)
                  (if (str? E)
                     (link E)
                     (chain E) ) ) ) ) )
      (if (: invite.txt) 
         (link 
            (cons "invitationText"
               (glue "\n\n"
                  (make 
                     (in (blob This 'invite.txt)
                        (until (eof) 
                           (link (line T)) ) ) ) ) ) )
         (link (cons "invitationText" "You haven't yet written an invitation")) )
      (link
         (make (link "items" T)
            (for C (: chronicle)
               (link (json> C)) ) ) ) ) )

# only gathers chronicle entries with title/date
(dm json> (Flag)  # flag to display +Chronicle
   (make
      (link (cons "urlNm" (: urlNm)))
      (link (cons "urlStr" (: urlStr)))
      (link (cons "nm" (: nm)))
      (link (cons "nm1" (: nm1)))
      (if (: nm2) (link (cons "nm2" @)))
      (if (: nm3) (link (cons "nm3" @)))
      (if (: born) (link (cons "born" @)))
      (if (: died) (link (cons "died" @)))
      (if (: img) (link (cons "avatar" (pack *API (blob This 'img)))))
      (if Flag
         (link
            (make (link "items" T)
               (for C (: chronicle)
                  (when (and (; C title) (; C date)) 
                     (link (json> C)) ) ) ) ) ) ) )

(allow "!newMemorial")
(de newMemorial ()
   (let [Nm1  (posted "nm1")
         Nm2  (posted "nm2")
         Nm3  (posted "nm3")
         Born (posted "born")
         Died (posted "died")
         UserId  (getJson "sub" (decodeJWT *Secret (posted "loginToken"))) ]
      (if (db 'id '+User UserId)  # => @
         (with  # new +Memorial => This
            [new! '(+Memorial)
              'id (genKey 'id '+Memorial)
              'urlStr (genUrlStr)
              'urlNm (pack Nm1 Nm2 Nm3)
              'nm (glue " " (filter '((S) (not (= NIL S))) (list Nm1 Nm2 Nm3)))
              'nm1 Nm1
              'nm2 Nm2
              'nm3 Nm3
              'usr @  # bound from 'if' statement
              'born Born
              'died Died ]
            # upload image
            (when (posted "img")  # '@' now contains base64 data URL
              (put!> This 'img T)
              (pipe
                 # send to base64 utility to decode
                 (out '(base64 "-d") (prin @))
                 # write decoded image to db blob file
                 (out (blob This 'img) (echo) ) ) )
            # +Chronicle entry for birth
            (new! '(+Chronicle)
              'id (genKey 'id '+Chronicle)
              'memorial This
              'title (pack Nm1 " was born")
              'date Born )
            # +Chronicle entry for death
            (if Died
               (new! '(+Chronicle) 
                 'id (genKey 'id '+Chronicle)
                 'memorial This
                 'title (pack Nm1 " passed away")
                 'date Died ) )
            (respondJson (json> This)) ) ) ) )

(allow "!updInvitation")
(de updInvitation ()
   (let [Id (getJWT "sub" "loginToken")
         M  (db 'urlNm '+Memorial (posted "memorial")) ]
      (ifn M
         (respondJsonError "Bad memorial")
         (unless (; M invite.txt) (put!> M 'invite.txt T))
         (unless (; M invite.md) (put!> M 'invite.md T))
         (out (blob M 'invite.txt) (prin (posted "invitation")))
         (out (blob M 'invite.md) (prin (posted "markdown")))
         (respondJson (list (cons "ok" "invitation updated"))) ) ) )

(allow "!updEmails")
(de updEmails ()
   (let M (db 'urlNm '+Memorial (posted "memorial"))
      (ifn M
         (respondJsonError "Bad memorial")
         (with M
            (ifn (: emails)
               # if no existing list, add emails
               (put!> This 'emails (cdr (posted "emails")))
               # else add new emails to list
               (finally (commit)
                  (for E (cdr (posted "emails"))
                     (queue (:: emails) E) ) ) )
               (sendEmails This) ) 
         (respondJson (list (cons "ok" "invitation list updated"))) ) ) )

(allow "!sendEmails")
(de sendEmails (Memorial)
   # NOTE - THIS PATTERN IS BROKEN
   # will not work when there are multiple memorials 
   # of the same name
   (with Memorial  # -> This
      (put!> This 'emails
         (make
            (for E (: emails)
               (if (pair E)
                  (link @)
                  # (let Invite (in (blob This 'invite.md) (till NIL T)) ...
                  (sendInvitationEmail E This)  # (sendInvitationEmail E Invite)
                  (link (list E)) ) ) ) ) ) )

# probably don't want to read the file every time
(de sendInvitationEmail (Email Memorial)
   (msg "Invitation sent to " Email)
   (mail-html "localhost" 25 *Email Email
      # subject
      "LovesWake - Invitation to Contribute"
      # attachments
      NIL
      # body
      (prin (in (blob Memorial 'invite.md) (till NIL T)) ) ) )

(allow "!getMemorial")
(de getMemorial (UrlNm)
   (let Mem (db 'urlNm '+Memorial UrlNm)
      # if memorial exists and belongs to user
      (if Mem
         (respondJson (json> @))
         (respondJsonError "sorry") ) ) )

##########

########################
#  +Chronicle
(class +Chronicle +Entity)

# link back to memorial
(rel memorial (+Joint) chronicle (+Memorial))  
(rel id (+Key +Number))
(rel title (+Idx +String))
(rel location (+Ref +String))
(rel date (+Ref +String))
(rel txt (+Blob))                      # story text (markdown)
(rel img (+Blob))                      # image
(rel aud (+Blob))                      # audio
(rel vid (+Blob))                      # video

(dm json> ()
   (make
      (if (: id) (link (cons "id" @)))
      (if (: title) (link (cons "title" @)))
      (if (: location) (link (cons "location" @)))
      # use 'start' for vis.Timeline - start date (the 'point') on timeline
      (if (: date) (link (cons "start" @)))
      (if (: txt) (link (cons "txt" (glue "\n\n" (make (in (blob This 'txt) (until (eof) (link (line T)))))))))
      (if (: img) (link (cons "imageSrc" (pack *API (blob This 'img)))))
      (if (: aud) (link (cons "audioSrc" (pack *API (blob This 'aud)))))
      (if (: vid) (link (cons "videoSrc" (pack *API (blob This 'vid))))) ) )

# API/!getChronicle
(allow "!getChronicle")
(de getChronicle (UrlStr UrlNm)
   (if (db 'urlNm '+Memorial UrlNm 'urlStr UrlStr)
      (respondJson (json> @ T))
      (respondJsonError "This memorial does not exist") ) )

# API/!newChronicle
(allow "!newChronicle")
(de newChronicle ()
   (if (db 'urlNm '+Memorial (posted "urlNm"))  # -> '@'
      (with 
         # new +Chronicle -> 'This' for rest of prg
         [new! '(+Chronicle)
            'memorial  @  # '@' bound from 'if' statement, see above 
            'id        (genKey 'id '+Chronicle)
            'title     (posted "title")
            'location  (posted "location")
            'date      (posted "date") ]
         (cond 
            ((posted "image")  # '@' now contains base64 data URL
               (put!> This 'img T)
               (pipe
                  # send to base64 utility to decode
                  (out '(base64 "-d") (prin @))
                  # write decoded image to db blob file
                  (out (blob This 'img) (echo) ) ) )
            ((posted "audio")  # '@' now contains base64 data URL
               (put!> This 'aud T)
               (pipe
                  # send to base64 utility to decode
                  (out '(base64 "-d") (prin @))
                  # write decoded audio to db blob file
                  (out (blob This 'aud) (echo) ) ) )
            ((posted "video")  # '@' now contains base64 data URL
               (put!> This 'vid T)
               (pipe
                  # send to base64 utility to decode
                  (out '(base64 "-d") (prin @))
                  # write decoded video to db blob file
                  (out (blob This 'vid) (echo) ) ) ) )
         (respondJson 
            (json> This) ) ) ) )

(allow "!delChronicle")
(de delChronicle ()
   (let [User (db 'id '+User (getJWT "sub" "loginToken"))
         Item (db 'id '+Chronicle (posted "id")) ]
      (ifn (member (; Item memorial) (; User memorials))
         (respondJsonError "No permission to delete item")
         (lose!> Item)
         (respondJson (list (cons "ok" "Item deleted"))) ) ) )
      

# API/!newWrittenChronicle
(allow "!newWrittenChronicle")
(de newWrittenChronicle (UrlNm)
   (if (db 'urlNm '+Memorial UrlNm)  # -> @
      (with 
         # new +Chronicle -> 'This' for rest of prg
         [new! '(+Chronicle)
            'memorial @  # '@' bound from 'if' statement, see above 
            'id       (genKey 'id '+Chronicle)
            'title    (posted "title")
            'location (posted "location")
            'date     (posted "date") ]
         (when (posted "txt")  # -> @
            (put!> This 'txt T)
            (out (blob This 'txt) (prin @)) )
         (respondJson 
            (json> This) ) ) ) )

(allow "!updChronicle")
(de updChronicle ()
   (let [UserId   (getJWT "sub" "loginToken")
         User     (db 'id '+User UserId)
         Memorial (db 'urlNm '+Memorial (posted "urlNm"))
         Item     (db 'id '+Chronicle (posted "id")) ]
      (and *Dbg
         (msg "!updChronicle" " - " (stamp))
         )
      # checks
      (nond
         # TODO - better error handling
         (User     (respondJsonError "Bad user"))
         (Memorial (respondJsonError "Bad memorial"))
         (Item     (respondJsonError "Bad item"))
         # if user is NOT the creator of memorial, can't edit
         # NOTE - this will need to change when functionality is added to allow multiple
         # admins on a memorial
         ((= (; Item memorial usr) User)
            (respondJsonError "No permission to edit item") )
         # check that chronicle item and memorial match
         ((= (; Item memorial) Memorial)
            (respondJsonError "Item not in chronicle") )
         # all is good, update item
         (NIL
            (unless (= (; Item title) (posted "title"))
               (put!> Item 'title (posted "title")) )
            (unless (= (; Item date) (posted "date"))
               (put!> Item 'date (posted "date")) )
            (unless (= (; Item location) (posted "location"))
               (put!> Item 'location (posted "location")) )
            (when (posted "image")  # '@' now contains base64 data URL
               (or (; Item img) (put!> Item 'img T))
               (pipe
                  # send to base64 utility to decode
                  (out '(base64 "-d") (prin (posted "image")))
                  # write decoded image to db blob file
                  (out (blob Item 'img) (echo)) ) )
            (respondJson (list (cons "yep" "Item updated"))) ) ) ) )


############

# API
#
# NOTE - incoming POST body data will be available as an 'assoc'
# list in *Posted. 'posted' maybe used to get values from the assoc
# list.

# seed the random number generator
(seed (in "/dev/urandom" (rd 8)))

# /api/!newUser
(allow "!newUser")
(de newUser ()  # email, password
   (let [Em (posted "email")  Pw (posted "password")]
      ## if email exists in db
      (if (db 'em '+User Em)
         ## respond with error
         (respondJson 
            (list 
               (cons "error"
                  (pack
                     "An account has already been created with that email address. "
                     "Please try signing up with a different email address." ) ) ) )
         ## else, continue with account creation
         (let Rand (rand 100000 999999)
            (with
               (new! '(+User)
                  'id (genKey 'id '+User)
                  'em Em
                  'created (stamp)
                  'pw (bcrypt~hashpw Pw 14)
                  'confirmationNumber Rand )
               (sendConfirmationEmail Em Rand)
               (msg "New User: " Em ", Confirmation Number: " Rand)
               ## respond with user ID and a 1-hour token used to confirm
               ## the account
               (respondJson
                  (list 
                     (cons "loginToken"
                        (encodeJWT *Secret 3600 ("iss" . "Love's Wake") ("sub" . (: id))) ) ) ) ) ) ) ) )

(de newUserConfirmationToken (Id)
   (cons "newUserConfirmationToken"
      (encodeJWT *Secret 3600
         ("iss" . "lovesWake")
         ("sub" . (list Id)) ) ) )


# *Email is set in main.l
(de sendConfirmationEmail (Email Num)
   (mail "localhost" 25 *Email Email
      # subject
      "LovesWake - Please confirm your email address."
      # attachments
      NIL
      # body
      "Thanks for signing up for LovesWake! Please use the six-digit number below to confirm your account:"
      NIL
      Num
      NIL
      "Thanks,"
      "LovesWake" ) )

# /api/!confirmUser
# TODO - should use a JWT
(allow "!confirmUser")
(de confirmUser ()
   (let [Id (getJWT "sub" "loginToken")  Code (posted "code")]
      (with (db 'id '+User Id)
         (ifn (= (: confirmationNumber) (any Code))
            (respondJson
               (list (cons "error" "Confirmation number is incorrect, please try again.")) )
            (put!> (db 'id '+User Id)
               'confirmed T )
            (respondJson
               (list 
                  (cons "confirmAccountSuccess" "true")
                  (cons "loginToken" (encodeJWT *Secret 3600 ("iss" . "lovesWake") ("sub" . (: id)))) ) ) ) ) ) )
                  

# /api/!loginUser
(allow "!loginUser")
(de loginUser ()
   (let [Em (posted "em")  Pw (posted "pw")]
      (and *Dbg
         # debugging output
      )
      # find user in DB
      (ifn (db 'em '+User Em)
         # if no, login error
         (respondJsonError
            (pack 
               "We couldn't find an account associated with this email address. "
               "Check for typos and try again." ) )
         # if yes
         (with @
            # correct password?
            (ifn (bcrypt~compare Pw (val (: pw)))
               # if no
               (respondJsonError
                  "Incorrect password. Please check for typos or try recovering your account." )
               # if yes
               (respondJson
                  (list
                     # login token - valid 1 week
                     (cons "loginToken" (encodeJWT *Secret 604800 ("iss" . "loveswake.com") ("sub" . (: id)))) ) ) ) ) ) ) )

# /api/!getUserData
(allow "!getUserData")
(de getUserData ()
   (let [Id (getJWT "sub" "loginToken") ]
      (ifn (db 'id '+User Id)
         (forbidden)
         (respondJson (json> @) ) ) ) )

# /api/!recoverUserAccount
# FIXME - THIS FUNCTION IS NOT WORKING
# begins the user account recovery process.
# sends email with six-digit number, which can be used to reset
# the account password.
(allow "!recoverUserAccount")
(de recoverUserAccount (Email)
   # find user in DB
   (ifn (db 'em '+User Email)
      # if no, return error
      (respondJson
         (list 
            (cons "error" 
               (pack 
                  "We couldn't find an account associated with this email address. "
                  "Check for typos and try again." )) ) )
      (let Num (rand 100000 999999)
         (put!> (db 'em '+User Email) 'recoverAccountNumber Num)
         (sendRecoverAccountEmail Email Num)
         (respondJson
            (list (cons "email" Email)) ) ) ) )

(de sendRecoverAccountEmail (Email Num)
   (mail-html "localhost" 25 *Email Email
      # subject
      "LovesWake - Account Recovery"
      # attachments
      NIL
      # body
      (<p> NIL
         "Please use the following six-digit number to reset the password on your account:" )
      (<br>)
      (<strong> NIL Num) ) )

# /api/!confirmRecoverAccountNumber
# checks the six-digit number that was set in the 'recoverUserAccount'
# function. if the number is correct, sends data to client to prompt for
# password reset.
# FIXME - THIS FUNCTION IS NOT WORKING
(allow "!confirmRecoverAccountNumber")
(de confirmRecoverAccountNumber (Email Num)
   (let User (db 'em '+User Email)
      (ifn (= (; User recoverAccountNumber) Num)
         (respondJson
            (list 
               (cons "error" 
                  (pack 
                     "The six-digit account recovery number is not correct. " 
                     "Please check your email and try again.")) ) )
         (put!> User
            'canResetPassword T )
         (put!> User
            'recoverAccountNumber NIL )
         (respondJson
            (list (cons "canResetPassword" "true")) ) ) ) )

# /api/!resetUserPassword
(allow "!resetUserPassword")
(de resetUserPassword (Email Password)
   (let User (db 'em '+User Email)
      (ifn (; User canResetPassword)
         (respondJson
            (list (cons "error" "Not authorized to reset password.")) )
         (put!> User
            'pw (bcrypt~hashpw Password 14) )
         (put!> User
            'canResetPassword NIL )
         (respondJson
            (list 
               (cons "user" (; User em))
               (cons "token" (encodeJWT *Secret 3600 ("iss" . "lovesWake") ("sub" . (: id)))) ) ) ) ) )
      

(de loginError ()
   (list (cons "error" "login error")) )

 # database sizes
 (dbs
    (3 +User +Memorial +Chronicle)
    (3 (+User pw))
    (4 (+Chronicle title))
    (4 (+Chronicle id location date))
    (4 (+User id em confirmed))
 )

# utils
#
# get 'Claim' from payload of 'Token'
#
# usage - (getJWT "exp" "authToken")
#
# NOTE - jwt should be sent in body of POST
#
(de getJWT (Claim Token)
   (getJson Claim (decodeJWT *Secret (posted Token))) )

