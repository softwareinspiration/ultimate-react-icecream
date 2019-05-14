import React, { useEffect, useCallback, useState } from 'react';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import IceCream from './IceCream';
import { getIceCream, postMenuItem } from '../data/iceCreamData';

const AddIceCream = ({ location, history }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iceCream, setIceCream] = useState({});

  const getIceCreamId = useCallback(() => location.search.split('=')[1], [
    location.search,
  ]);

  useEffect(() => {
    let didCancel = false;
    getIceCream(getIceCreamId())
      .then(iceCreamResponse => {
        if (!didCancel) {
          setIceCream(iceCreamResponse);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response.status === 404 && !didCancel) {
          history.replace('/', { focus: true });
        }
      });
    return () => {
      didCancel = true;
    };
  }, [getIceCreamId, history]);

  const onSubmitHandler = menuItem => {
    postMenuItem(menuItem).then(() => {
      history.push('/', { focus: true });
    });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMsg="Loading ice cream."
        doneMsg="Ice cream loaded."
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
};

export default AddIceCream;