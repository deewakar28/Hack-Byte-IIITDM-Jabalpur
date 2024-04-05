import React, { useState } from 'react';
import axios from 'axios';
import vdehaze from '../assets/vdehaze.png'
function Video() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processedVideoPath, setProcessedVideoPath] = useState(null);

  const fileSelectedHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://127.0.0.1:5000/uploadvideo', formData)
      .then(response => {
        console.log('Upload successful:', response.data);
        setProcessedVideoPath(response.data.processed_video_path);
      })
      .catch(error => {
        console.error('Upload failed:', error.message);
        // Display error message
      });
  };

  const downloadProcessedVideo = () => {
    axios.get(`http://127.0.0.1:5000/processedvideo?path=${processedVideoPath}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `processed_video.mp4`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Download failed:', error.message);
        // Display error message
      });
  };

  return (
    <div>
      {/* <input type="file" onChange={fileSelectedHandler} />
      <button onClick={fileUploadHandler}>Upload</button>
      {processedVideoPath && <button onClick={downloadProcessedVideo}>Download Processed Video</button>} */}
      <div className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8">
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
          <div className="text-left">
            <h2 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 ">
              Dehaze
              <span className="font-bold text-primary"> videos</span>
            </h2>
            <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate dignissim augue, Nullam vulputate dignissim augue.
            </p>
            <div className="mt-5 sm:flex md:mt-8">
              <div className="rounded-md shadow">
                <label htmlFor="image-upload" className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-primary border border-transparent rounded-md cursor-pointer focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-8">
                  Choose file
                  <input id="image-upload" name="image-upload" type="file" className="hidden" accept="image/*" onChange={fileSelectedHandler} />
                </label>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <button className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-primary transition duration-150 ease-in-out bg-secondary border border-transparent rounded-md cursor-pointer  focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-8" onClick={fileUploadHandler}>
                  Upload Video
                </button>
              </div>
              <div>
              {processedVideoPath && <button onClick={downloadProcessedVideo} className="flex items-center justify-center w-full px-8 py-3 text-base font-medium leading-6 text-primary transition duration-150 ease-in-out bg-secondary border border-transparent rounded-md cursor-pointer  focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-8">Download Video</button>}

              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
          <div className="relative w-full p-3 rounded md:p-8">
            <div className="rounded-lg bg-white text-black w-full">
              <img src={vdehaze} alt="Dehaze" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;