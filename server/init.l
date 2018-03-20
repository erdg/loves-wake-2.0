(new! '(+User)
   'id (genKey 'id '+User)
   'em "erik.d.gustafson@gmail.com"
   'pw (bcrypt~hashpw "erikiscool" 14)
)
