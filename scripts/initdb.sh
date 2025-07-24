echo 'nimble-core-user -D -s'
createuser nimble-core-user -D -s

createdb nimble-core-db -O nimble-core-user
