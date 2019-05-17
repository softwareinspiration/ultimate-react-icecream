import React, { useEffect, useState } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';
import { getIceCreams } from '../data/iceCreamData';
import { css } from 'emotion/macro';

const paragraphStyle = css`
  max-width: 60%;
  margin: 0 auto;
  padding-bottom: 3em;
`;

const IceCreams = ({ history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iceCreams, setIceCreams] = useState([]);

  useEffect(() => {
    let didCancel = false;
    getIceCreams().then(iceCreams => {
      if (!didCancel) {
        setIceCreams(iceCreams);
        setIsLoading(false);
      }
    });
    return () => {
      didCancel = true;
    };
  }, []);

  const onClickHandler = id => {
    history.push(`/menu-items/add?iceCreamId=${id.toString()}`);
  };

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMsg="Loading the stock list."
        doneMsg="Loading stock list complete."
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name, image }) => (
            <IceCreamCard
              key={id}
              id={id}
              image={image}
              heading={name}
              to={{
                pathname: '/menu-items/add',
                search: `?iceCreamId=${id.toString()}`,
              }}
              callToAction="Select to add"
              onClick={onClickHandler}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className={paragraphStyle}>Your menu is fully stocked!</p>
        )
      )}
    </Main>
  );
};

export default IceCreams;
