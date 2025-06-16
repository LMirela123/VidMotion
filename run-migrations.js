import fs from 'node:fs/promises';

start()
  .then(() => {
    console.log('All migrations ran successfully.');
    process.exit(0);
  })
  .catch(() => {
    console.error('Errors ran with errors.');
    process.exit(1);
  });

async function start() {
  // Get all file names from the migrations directory
  const migrationFiles = await fs.readdir('./migrations');

  return Promise.all(
    migrationFiles.map(async (file) => {
      // Import each migration file dynamically
      const migration = await import(`./migrations/${file}`);
      
      // Get the class from the imported migration file
      const migrationClass = Object.values(migration)[0];

      // Run the migrationUp or migrationDown method depending
      // if the "--up" command line argument is present or not
      const runMigrationUp = process.argv.includes('--up');

      if (runMigrationUp && typeof migrationClass.migrationUp === 'function') {
        await migrationClass.migrationUp();
      } else if (typeof migrationClass.migrationDown === 'function') {
        await migrationClass.migrationDown();
      } else {
        const errorMessage = `Migration file ${file} does not have a valid migrationUp or migrationDown method.`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }

      return file;
    })
  );
}
