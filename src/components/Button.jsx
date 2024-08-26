import React, { useState, useRef } from 'react';

const Button = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
  
    const handleStartRecording = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
  
          mediaRecorder.onstart = () => {
            audioChunksRef.current = [];
            setIsRecording(true);
            console.log('Recording started');
          };
  
          mediaRecorder.ondataavailable = event => {
            audioChunksRef.current.push(event.data);
          };
  
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
            setIsRecording(false);
            console.log('Recording stopped');
          };
  
          mediaRecorder.start();
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
        });
    };
  
    const handleStopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };


  return (
    <div>

        <div 
        className='button-cont' 
        id="rec-btn" 
        onMouseDown={handleStartRecording}
        onMouseUp={handleStopRecording}
        onTouchStart={handleStartRecording}
        onTouchEnd={handleStopRecording}
        >
            <div className='button'>
                Translate
            </div>
        </div>


        <div className='audio'>
            {audioUrl && (
            <audio controls src={audioUrl} style={{ marginTop: '20px' }} />
        )}
        </div>
    </div>


  )
}


export default Button