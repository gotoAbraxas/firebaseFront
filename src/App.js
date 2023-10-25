import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { api } from './network/api';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase/firebaseConfig';
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

function App() {

  initializeApp(firebaseConfig);
  const storage = getStorage()



  const [img, setImg] = useState()


  const keys = 'put-token-of-Firebase-admin-in-server'

  const onChangeImgHander = (e) => {

    const selectedImage = e.target.files[0];
    setImg(selectedImage);

  }




  const handleImageUpload = async () => {


    if (img) {
      const storageRef = ref(storage, img.name)
      // 이 위에건 결국 안쓰나?


      const root = 'put-your-root-of- storage'
      const imagesRef = ref(storage, root);

      // 이미지 파일 업로드
      try {
        const data = await uploadBytes(imagesRef, img)
      } catch (err) {
        console.error('뭔가 에러', err)
      }

      let url;

      try {


        url = await getDownloadURL(imagesRef)
      }
      catch (err) {
        console.log('이쪽도 뭔가 에러')
      }
      console.log(url)


    } else {
      console.error('이미지를 선택하세요.');
    }
  };


  const getTest = async () => {


    // 현재 접속한 클라이언트의 인증을 받는 것.
    // 이것 또한 스토리지 규칙에 의거, 인증된 사람만 write를 할 수 있게 하는 것임.

    const auth = getAuth();
    signInWithCustomToken(auth, keys)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });


  }

  useEffect(() => {
    getTest()

  }, [])




  return (
    <form onSubmit={handleImageUpload}>
      <input type='file' onChange={onChangeImgHander}></input>
      <button type='submit'> 서밋</button>
    </form>
  );
}

export default App;
