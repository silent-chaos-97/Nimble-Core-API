# Seeds

The seeds are used to insert database data for tests.
The file should be snake case and plural.

Support:

    seed.entity.create() // create all
    seed.entity.create(1) // create by id
    seed.entity.create({}) // create by object
    seed.entity.create([]) // create by collection
    seed.entity.get() // get first
    seed.entity.get(1) // get by id

If you add a file for a new table, don't forget to edit the seeds.js file
