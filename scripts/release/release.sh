set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."
  npm test

  # commit
  npm version $VERSION --message "release: $VERSION"
  npm run build

  git add -A
  git commit -m "build: $VERSION"
  git push

  # publish
  git tag $VERSION -m "release: $VERSION"
  git push origin "$VERSION"
  npm publish
fi