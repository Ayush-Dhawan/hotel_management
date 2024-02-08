import { useEffect, useRef } from "react";



export function useOutsideClick(handler, listenCapturing = true){
    const ref = useRef();
    useEffect(() =>{

        function handleClick(e){
          if(ref.current && !ref.current.contains(e.target)) handler();
        }
    
        document.addEventListener('click', handleClick, listenCapturing); // we add true so that events arent listened in bubbling phase but instead in capturing phase...this helps avoid bugs
    
        return () => document.removeEventListener('click', handleClick, listenCapturing)
      }, [handler, listenCapturing])

      return ref;
}