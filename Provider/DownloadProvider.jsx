// DownloadContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { FFmpegKit } from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import notifee from '@notifee/react-native';
const DownloadContext = createContext();

export const useDownload = () => {
  return useContext(DownloadContext);
};

export const DownloadProvider = ({ children }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedUri, setDownloadedUri] = useState(null);
  const [downloadTask, setDownloadTask] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  // async function onDisplayNotification() {
  //   // Request permissions (required for iOS)
  //   await notifee.requestPermission()

  //   // Create a channel (required for Android)
  //   const channelId = await notifee.createChannel({
  //     id: 'default',
  //     name: 'Default Channel',
  //   });
  //   notifee.setBadgeCount(1).then(() => console.log('Badge count set!'));

  //   // Display a notification
  //   await notifee.displayNotification({
  //     title: 'MeshFlix',
  //     body: 'Main body content of the notification',
  //     android: {
  //       channelId,
  //       smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: 'default',
  //       },
  //     },
      
  //   });
  // }
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

  const downloadFromUrl = async () => {
    const filename = "small.mp4";
    const downloadResumable = FileSystem.createDownloadResumable(
      "https://gamn.v486a7dc1f0.site/_v2-remg/12a3c523fa105800ed8c394685aeeb0b912ea95c54b0bbec0d1b7baea93ece832257df1a4b6125fcfa38c35da05dee86aad28d46d73fc4e9d4e5a3381022a18934c614a31e1abd5612c2f6ab6b462205656dd03c57053a919e9ce95ecbf62a863b48e31c/h/ca1/bbd;15a38634f803584ba8926411d7bee906856cab0654b5bfb2.m3u8",
      FileSystem.documentDirectory + filename,
      {},
      callback
    );

    setDownloadTask(downloadResumable);
    setIsDownloading(true);

    try {
      const { uri } = await downloadResumable.downloadAsync();
      setDownloadedUri(uri);
      console.log("Finished downloading to ", uri);
      setIsDownloading(false);
      // Additional logic after download completion
    } catch (e) {
      console.error("Error while downloading file: ", e);
    }
  };

  const pauseDownload = async () => {
    if (downloadTask && isDownloading) {
      await downloadTask.pauseAsync();
      setIsDownloading(false);
    }
  };
  const saveAsync = async (downloadResumable) => {
    await downloadResumable.pauseAsync();
    console.log("Paused download operation, saving for future retrieval");
    AsyncStorage.setItem(
      "pausedDownload",
      JSON.stringify(downloadResumable.savable())
    );
  };

  const resumeAsync = async (downloadResumable) => {
    downloadResumable.resumeAsync();
  };
  const resumeDownload = async () => {
    if (downloadTask && !isDownloading) {
      await downloadTask.resumeAsync();
      setIsDownloading(true);
    }
  };

  const deleteDownloadedFile = async () => {
    if (downloadedUri) {
      try {
        console.log(downloadedUri);
        await FileSystem.deleteAsync(downloadedUri);
        console.log("File deleted successfully");
        setDownloadedUri(null);
        setDownloadProgress(0);
        console.log("downloaddd taskkk", downloadTask);
        if (downloadTask) {
          await downloadTask.pauseAsync();
        }
        setIsDownloading(false);
      } catch (error) {
        console.error("Error while deleting file: ", error);
      }
    } else {
      console.log("No file to delete");
    }
  };

  const handleDownloadResume = async () => {
    // To resume a download across app restarts, assuming the DownloadResumable.savable() object was stored:
    const downloadSnapshotJson = await AsyncStorage.getItem("pausedDownload");
    const downloadSnapshot = JSON.parse(downloadSnapshotJson);
    if (downloadSnapshot === null) {
      console.log(null);
      return;
    }
    const resumedDownloadResumable = new FileSystem.DownloadResumable(
      downloadSnapshot.url,
      downloadSnapshot.fileUri,
      downloadSnapshot.options,
      callback,
      downloadSnapshot.resumeData
    );
    console.log(resumedDownloadResumable);
    if (!resumedDownloadResumable) {
      try {
        const { uri } = await resumedDownloadResumable.resumeAsync();
        console.log("Finished downloading to ", uri);
      } catch (e) {
        console.error(e);
      }
    }
  };

  async function downloadSegments(segmentUrls) {
    const downloadedSegments = [];
    let totalBytesWritten = 0;
    let totalContentLength = 0;

    for (let i = 0; i < segmentUrls.length; i++) {
      try {
        const segmentPath = await downloadSegment(
          segmentUrls[i],
          i,
          (bytesWritten, contentLength) => {
            totalBytesWritten += bytesWritten;
            totalContentLength += contentLength;

            const overallPercentage = (
              (totalBytesWritten / totalContentLength) *
              100
            ).toFixed(2);
            console.log(`Overall Download Progress: ${overallPercentage}%`);
          }
        );
        downloadedSegments.push(segmentPath);
      } catch (error) {
        console.error(error.message);
        // Handle the error according to your application's requirements
      }
    }
    return downloadedSegments;
  }

  async function downloadSegment(segmentUrl, index, progressCallback) {
    const MAX_RETRIES = 3;
    const TIMEOUT_DELAY = 5000; // milliseconds
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        const segmentFilename = `segment_${index}.ts`;
        const destinationPath = `${RNFS.DocumentDirectoryPath}/${segmentFilename}`;

        // Download the segment with progress callback
        const downloadResult = await RNFS.downloadFile({
          fromUrl: segmentUrl,
          toFile: destinationPath,
          progress: (data) => {
            progressCallback(data.bytesWritten, data.contentLength);
          },
        }).promise;

        return destinationPath;
      } catch (error) {
        console.error(`Error downloading segment ${index}:`, error.message);
        retries++;
        // Add a delay before retrying
        await new Promise((resolve) => setTimeout(resolve, TIMEOUT_DELAY));
      }
    }

    throw new Error(
      `Failed to download segment ${index} after ${MAX_RETRIES} attempts.`
    );
  }

  const downloadAndProcessVideo = async () => {
    try {
      // Fetch the .m3u8 file
      console.log("started");
      const response = await axios.get(
        "https://pdrz.v499a24ccfe.site/_v2-akxm/12a3c523fd105800ed8c394685aeeb0b972ef95c15bbe3b04d447baea93ece832257df1a4b6125fcfa38c35da05dee86aad28d46d73fc4e9d4e5a33b5075f39263974aa05d48e8085691a6b039117e166664d1740700379a9ec0f550d4e62e917140a54d0166b402f1ad6d5de2/h/cbffa3/cbaafdff;15a38634f803584ba8926411d7bee906856cab0654b5bfb2.m3u8"
      );
      const playlist = response.data;
      const pathUriMp4 = FileSystem.documentDirectory + "video.mp4";
      // Parse the playlist to extract the URLs of the video segments
      const segmentUrls = playlist
        .split("\n")
        .filter((line) => line.trim().startsWith("http"));

      // Download each segment
      const downloadedSegments = await downloadSegments(segmentUrls);

      // Construct FFmpeg command
      // const ffmpegCommand = `ffmpeg -i concat:${downloadedSegments.join('|')} -c:v mpeg4 file2.mp4`;
      const ffmpegSession = await FFmpegKit.execute(
        `-i concat:${downloadedSegments.join(
          "|"
        )} -c:v copy -c:a copy -y ${pathUriMp4}`
      );

      await ffmpegSession.getReturnCode();
      await Promise.all(
        downloadedSegments.map((segmentPath) => RNFS.unlink(segmentPath))
      );
      console.log("completed mp4");
    } catch (error) {
      console.error("Error downloading and processing video:", error);
    }
  };
  useEffect(() => {
    handleDownloadResume(); // Trigger the download resume process when the component mounts
  }, []);

  const value = {
    downloadProgress,
    downloadedUri,
    downloadTask,
    isDownloading,
    downloadFromUrl,
    pauseDownload,
    resumeDownload,
    deleteDownloadedFile,
    handleDownloadResume,
    downloadAndProcessVideo, // Add your custom download function here
  };

  return (
    <DownloadContext.Provider value={value}>
      {children}
    </DownloadContext.Provider>
  );
};
