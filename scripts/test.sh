#!/bin/sh

STR='GNU/Linux is an operating system'
SUB='Linux'

if [[ "$STR" =~ .*"$SUB".* ]]; then
  echo "It's there."
fi
