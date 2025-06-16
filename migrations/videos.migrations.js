import videos from './../mocks/videos.json' assert { type: 'json'};
import { addEntry, clearCollection } from './../src/scripts/firebase.service.js';

start();

function start() {
    const isUpMigration = process.argv.includes('--up');

    if (isUpMigration) {
        videoMigrationUp();
    } else {
        videoMigrationDown;
    }
}

export function videoMigrationUp() {
  const addVideosPromises = Promise.all(
    videos.map(async (video) => await addEntry('videos', video))
  );

   addVideosPromises
   .then((addedVideos) => {
    addedVideos = addedVideos.map((videoRef) => videoRef.id);
    console.log('Videos migration completely successfully.', addedVideos);
   })
   .catch((error) => {
    console.error('Error during videos migration:', error);
   });
}

export function videoMigrationDown() {
    const deletedVideosPromises = clearCollection('videos'); 

    deletedVideosPromises
    .then((result) => {
        console.log('Deleted videos:', result);
        console.log('Videos migration rolled back successfully.');
    })
    .catch((error) => {
        console.error('Error during videos migration rollback:', error);
    });
}