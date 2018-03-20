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
         "picolisp-minimal-http/http.l"
         "picolisp-mail-html/mail-html.l"
         "picolisp-json/json.l"
         "picolisp-bcrypt/bcrypt.l"
         "picolisp-jwt/jwt.l"
]

# load api routes
# this file contains 'dbs call
(load "loves-wake-2.0/server/api.l")


## load config values

# jwt secret key
(setq *Secret (in "/dev/urandom" (rd 12)))
# (setq *Secret (rc "lovesWake/.config" '*Secret))

# email address
(setq *Email "erik@erikdgustafson.com")

# address for automated emails
(setq *From "erik@erikdgustafson.com")

[setq 
   *Pool "db/loves-wake/"
   *Blob "db/loves-wake/blob/"
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
(allow *Blob T)

(de main ()
   (call "mkdir" "-p" "db/loves-wake/" *Blob)
   (pool *Pool *Dbs)
   (unless (seq *DB) 
      (load "loves-wake-2.0/server/init.l") ) )

(de go () 
   (retire 10)
   (server 8888) )
