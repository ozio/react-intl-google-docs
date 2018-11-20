#!/usr/bin/env bash

function ask_yes_or_no() {
  read -p "$1 (y/N): "
  case $(echo $REPLY | tr '[A-Z]' '[a-z]') in
    y|yes) echo "yes" ;;
    *)     echo "no" ;;
  esac
}

node --no-warnings ./
git --no-pager diff translations

if [[ "no" == $(ask_yes_or_no "Push this changes to repository?") ]]
then
  git checkout translations/*
  echo "Skipped."
  exit 0
fi

now=$(date)
git add translations
git commit -m "$now Translation updates"
git push origin master
