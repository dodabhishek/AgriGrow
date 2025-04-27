import React, { useRef } from "react";  

const VideoCall = ({ onCloseCall }) => {  
  const localVideoRef = useRef(null);  
  const remoteVideoRef = useRef(null);  

  // Start the local video stream when the component is mounted  
  const startLocalStream = async () => {    
    try {      
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });      
      localVideoRef.current.srcObject = stream;    
    } catch (error) {      
      console.error("Error accessing media devices:", error);    
    }  
  };  

  // Start the stream when the component is mounted  
  React.useEffect(() => {    
    startLocalStream();  
  }, []);  

  return (    
    <div className="video-call-container flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-1s">      
      <h2 className="text-white text-xl font-semibold mb-6 animate__animated animate__fadeIn">Video Call</h2>      
      <div className="video-call flex justify-center gap-6 mb-6">        
        {/* Local video */}        
        <video        
          ref={localVideoRef}        
          autoPlay        
          muted        
          className="w-72 h-48 border-2 border-gray-400 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"        
        />        
        {/* Remote video (empty for now) */}        
        <video        
          ref={remoteVideoRef}        
          autoPlay        
          className="w-72 h-48 border-2 border-gray-400 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105"        
        />      
      </div>      
      <div className="call-controls flex justify-center mt-6">        
        <button          
          onClick={onCloseCall}          
          className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 transform hover:scale-110"        
        >          
          End Call        
        </button>      
      </div>    
    </div>  
  );  
};  

export default VideoCall;
