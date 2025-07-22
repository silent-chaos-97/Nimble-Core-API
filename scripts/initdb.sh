createuser nimble-core-user -D -s

echo 'createdb nimble-core-db -O nimble-core-user'
createdb nimble-core-db -O nimble-core-user
