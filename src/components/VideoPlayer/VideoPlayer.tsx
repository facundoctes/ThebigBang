import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

interface VideoPlayerProps {
  stream: any;
}

export default function VideoPlayer({ stream }: VideoPlayerProps) {
  const ref = useRef<any>();

  useEffect(() => {
      console.log('render videopalyer')
    if (stream) {
        console.log('set stream to video')
      ref.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <>
      <video ref={ref} autoPlay style={{width: '600px'}} />
    </>
  );
}
