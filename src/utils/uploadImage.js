import app from "../config/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const uploadImage = ( acceptedFiles, setStatus, setValue )=>{
      const storage = getStorage( app );
      console.log(acceptedFiles)
      acceptedFiles.forEach( item => {
            const filename = new Date().getTime() + item.name;
            const storageRef = ref( storage, filename );
            const uploadTask = uploadBytesResumable(storageRef , item);
            uploadTask.on( 'state_changed', ( snapshot ) =>{
                  const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                  switch(snapshot.state){
                        case 'pause' :
                              setStatus( {paused : true} );
                              break;
                        case 'running' :
                              setStatus( {running :progress} );
                              break;
                  }
            }, (error) => console.log(error),
            () => {
                  getDownloadURL( uploadTask.snapshot.ref ) .then( dowloadURL => {
                        setValue( prevValue => {
                              return {
                                    ...prevValue,
                                    image : [...prevValue.image, dowloadURL]
                              }
                        })
                  });
            });

      });
};

export default uploadImage;