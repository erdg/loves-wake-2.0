# api.l - api endpoints and data structures

# UTILS
(de respondJson (Lst)
   (let Json (json~encode Lst)
      (http1 "application/json" 0)
      (prinl "Access-Control-Allow-Origin: *^M")
      (prinl "Content-Length: " (size Json) "^M^J^M")
      (prin Json) ) )

# get json val from list
(de getJson (Key Lst)
   (cdr (assoc Key Lst)) )

# by this convention, server-side errors are returned as,
# 
#    { error: "Server-side error text here" }
#
# to be displayed on the client.
(de respondJsonError (Str)
   (respondJson
      (list
         (cons "error"
            Str ) ) ) )

(de forbidden ()
   (prinl "HTTP/1.0 403 Forbidden^M")
   (prinl "Access-Control-Allow-Origin: *^M")
   (prinl "^M") )


#####################
# user
(class +User +Entity)

(rel id (+Key +Number))          # id number
(rel nm (+Ref +String))
(rel em (+Ref +String))          # email
(rel pw (+Swap +String))         # password

(rel created (+Ref +String))     # creation timestamp
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
            # email
            (link (cons "email" (: em)))
            # confirmed?
            (link (cons "confirmed" (if (: confirmed) 'true 'false)))
            # memorials
            # NOTE - a lot of nested make/link'ing here
            (link 
               (make (link "memorials" T)
                  (for M (: memorials)
                     (link (json> M T)) ) ) ) ) ) ) )

############

#########################
#  +Memorial
(class +Memorial +Entity)

(rel usr (+Joint) memorials (+User))   # created by user
(rel id (+Key +Number))                # unique memorial id number
(rel urlStr (+Ref +String))            # 8 char base64 string, e.g. "8bez73Ka"

(rel urlNm (+Ref +String))             # concatenated name, e.g. "MichaelJFox"
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

(dm json> (Flag)  # flag to display +Chronicle
   (make
      (link (cons "name" (: nm)))
      (link (cons "firstName" (: nm1)))
      (if (: nm2) (cons "middleName" (: nm2)))
      (if (: nm3) (cons "lastName" (: nm3)))
      (if (: born) (link (cons "born" @)))
      (if (: died) (link (cons "died" @)))
      (if (: img) (link (cons "avatar" (pack *API (blob This 'img)))))
      (if Flag
         (link 
            (make (link "items" T)
               (for M (: chronicle)
                  (link (json> M)) ) ) ) ) ) )

(allow "!newMemorial")
(de newMemorial ()
   (let [Json (json~decode *Post)
         Nm1   (getJson "nm1" Json)
         Nm2   (getJson "nm2" Json)
         Nm3   (getJson "nm3" Json)
         Born (getJson "born" Json)
         Died (getJson "died" Json)
         UserId  (getJson "sub" (decodeJWT *Secret (getJson "loginToken" Json))) ]
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
            (when (getJson "img" Json)  # '@' now contains base64 data URL
              (put!> This 'img T)
              (pipe
                 # send to base64 utility to decode
                 (out '(base64 "-d") 
                    # remove "data:image/<type>;base64," from URL
                    (prin (pack (stem (chop @) ",") ) ) )
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

(allow "!getMemorial")
(de getMemorial (Nm)
   (let [Json   (json~decode *Post)
         Mem    (db 'nm '+Memorial Nm)
         UserId (getJson "sub" (decodeJWT *Secret (getJson "loginToken" Json))) ]
      # if memorial exists and belongs to user
      (if (and Mem (= (db 'id '+User UserId) (; Mem usr)))
         (respondJson (json> Mem T))
         (respondJsonError "sorry") ) ) )

##########

########################
  +Chronicle
(class +Chronicle +Entity)

# link back to memorial
(rel memorial (+Joint) chronicle (+Memorial))  
(rel id (+Key +Number))
(rel title (+Idx +String))
(rel location (+Ref +String))
(rel date (+Ref +String))
(rel txt (+Blob))                      # story text
(rel img (+Blob))                      # image

(dm json> ()
   (make
      (if (: id) (link (cons "id" @)))
      (if (: title) (link (cons "title" @)))
      (if (: location) (link (cons "location" @)))
      # use 'start' for vis.Timeline - start date (the 'point') on timeline
      (if (: date) (link (cons "start" @)))
      # (cons "caption" (: txt))
      (if (: img) (link (cons "src" (pack *API (blob This 'img))))) ) )

# API/!getChronicle
(allow "!getChronicle")
(de getChronicle (Nm)
   (if (db 'nm '+Memorial Nm)
      (respondJson (json> @ T))
      (respondJsonError "This memorial does not exist") ) )

# API/!postChronicle
(allow "!postChronicle")
(de postChronicle (Nm)
   (let Json (json~decode *Post)
      (if (db 'nm '+Memorial Nm)  # -> '@'
         (with 
            # new +Chronicle -> 'This' for rest of prg
            [new! '(+Chronicle)
               'memorial @  # '@' bound from 'if' statement, see above 
               'id (genKey 'id '+Chronicle)
               'title (getJson "title" Json)
               'location (getJson "location" Json)
               'date (getJson "date" Json)
               'txt (getJson "txt" Json) ]
            (when (getJson "image" Json)  # '@' now contains base64 data URL
               (put!> This 'img T)
               (pipe
                  # send to base64 utility to decode
                  (out '(base64 "-d") 
                     # remove "data:image/<type>;base64," from URL
                     (prin (pack (stem (chop @) ",") ) ) )
                  # write decoded image to db blob file
                  (out (blob This 'img) (echo) ) ) )
            (respondJson 
               (json> This) ) ) ) ) )

(allow "!updateChronicle")
(de updateChronicle ()
   (let [Json (json~decode *Post)
         UserId (getJson "sub" (decodeJWT *Secret (getJson "loginToken" Json))) ]
         ) )
############

# API
#
# NOTE - incoming POST body data will be available in *Post.
# functions should call 'json~decode' to get an 'assoc' list
# of the POST data, e.g.
#
#  (let Json (json~decode *Post)
#     ... do something with 'Json' ... )


# seed the random number generator
(seed (in "/dev/urandom" (rd 8)))

# /api/!newUser
(allow "!newUser")
(de newUser (Em Pw)  # email, password
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
            ## respond with user ID and a 1-hour token used to confirm
            ## the account
            (respondJson
               (list 
                  (cons "email" (: em)) ) ) ) ) ) )

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
      "Thanks for signing up for LovesWake! Please enter the six-digit number below to confirm your account:"
      NIL
      Num
      NIL
      "Thanks,"
      "LovesWake" ) )

# /api/!confirmUser
# TODO - should use a JWT
(allow "!confirmUser")
(de confirmUser (Em Num)
   (with (db 'em '+User Em)
      (ifn (= (: confirmationNumber) Num)
         (respondJson
            (list (cons "error" "Confirmation number is incorrect, please try again.")) )
         (put!> (db 'em '+User Em)
            'confirmed T )
         (respondJson
            (list 
               (cons "user" (: em))
               (cons "token" (encodeJWT *Secret 3600 ("iss" . "lovesWake") ("sub" . (: id)))) ) ) ) ) ) 
                  

# /api/!loginUser
(allow "!loginUser")
(de loginUser ()
   (let [Json (json~decode *Post)  Em (getJson "em" Json)  Pw (getJson "pw" Json)]
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
   (let [Json (json~decode *Post)
         Jwt (decodeJWT *Secret (getJson "loginToken" Json))
         Id (getJson "sub" Jwt) ]
      (out 2 (prinl "id: " Id))
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
   (mailHTML "localhost" 25 *Email Email
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
