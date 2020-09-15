import React, { useEffect, useState } from 'react';
import './style.scss';
import '../../assets/scss/Main.scss';
import Header from '../../components/Header';
import CardTitle from '../../components/CardTitle';
import CardLink from '../../components/CardLink/CardLink';
import firebase from '../../utils/firebase';

function FrontEnd() {
  const allFrontEndArray = [];
  const [link, setLink] = useState([]);

  const firebaseRequisition = (collectionP, arrayP, setP) => {
    firebase
      .firestore()
      .collection(collectionP)
      .get()
      .then(async (result) => {
        await result.docs.forEach((doc) =>
          arrayP.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setP(arrayP);
      });
  };
  
  useEffect(() => {
    firebaseRequisition('front-end', allFrontEndArray, setLink)
  }, [allFrontEndArray]);

  
  return (
    <>
      <Header />
      <main className='main-front'>
        <CardTitle title='Front-end' img='front' alt='Página Front-end' />
        {link.map((eachLink) => (
          <CardLink
            key={eachLink.title}
            src={eachLink.image}
            alt={eachLink.title}
            title={eachLink.title}
            href={eachLink.link}
          />
        ))}
      </main>
    </>
  );
}

export default FrontEnd;
