# see 'api.l' for allowed functions
(allowed ("loves-wake-2.0/server"))

# load deps
#
# NOTE - these will need to be installed on the server
# see github.com/...
#     aw/picolisp-[json|bcrypt]
#     ergd/picolisp-[minimal-http|mail-html|jwt]
[let Prefix "loves-wake-2.0/server/lib/"
   (mapcar '((Lib) (load (pack Prefix Lib)))
      (list
         # edit below 
         "picolisp-mail-html/mail-html.l"
         "picolisp-json/json.l"
         "picolisp-minimal-http/http.l"
         "picolisp-bcrypt/bcrypt.l"
         "picolisp-jwt/jwt.l"
]

# load api routes
# this file contains 'dbs call
(load "loves-wake-2.0/server/api.l")


## load config values

# jwt secret key
# WARNING -- CHANGE THIS SUPER SECRET KEY TO 
# SOMETHING SECURE FOR PRODUCTION
# (setq *Secret "Secret")

# production
(setq *Secret (rc "loves-wake-2.0/.config" '*Secret))

# email address
(setq *Email "erik@erikdgustafson.com")

# address for automated emails
(setq *From "erik@erikdgustafson.com")

[setq 
   *Pool "db/loves-wake/"
   *Blob "uploads/"
   *API 
      (if *Dbg
         "http://localhost:8888/"
         "https://erikdgustafson.com/api/" )
]

# FIXME - this allows access to the blob directory.
# I think only through the picolisp process, but I'm
# not sure of the security implications. Research needed.
# Make sure that it can only be written by the picolisp 
# process. Or just send images to the client instead of
# referencing them on the server.

# UPDATE - *Blob is now seperate from the DB directory.
# DB directory access is blocked by nginx. No outside traffic
# allowed to access it, only the locally running PL process.
# Secure? It will have to do for now.
(allow *Blob T)

(de main ()
   (call "mkdir" "-p" "db/loves-wake/" *Blob)
   (pool *Pool *Dbs) )

(de go () 
   (retire 10)
   (server 8888) )
