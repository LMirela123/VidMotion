import videos from './../mocks/videos.json' assert { type: 'json' };
import {
  addEntry,
  clearCollection,
} from './../src/scripts/firebase.service.js';

export default class VideosMigration {
  static async migrationUp() {
    try {
      let addedVideos = await Promise.all(
        videos.map((video) => addEntry('videos', video))
      );

      addedVideos = addedVideos.map((videoRef) => videoRef.id);
      console.log('Videos migration completed successfully:', addedVideos);
    } catch (error) {
      console.error('Error during videos migration:', error);
      throw error;
    }
  }

  static async migrationDown() {
    try {
      const deletedVideos = await clearCollection('videos');
      console.log('Deleted videos:', deletedVideos);
      console.log('Videos migration rolled back successfully.');
    } catch (error) {
      console.error('Error during videos migration rollback:', error);
      throw error;
    }
  }
}
