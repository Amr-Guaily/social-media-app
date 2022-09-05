import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Pin, NoPins, Loading } from '../index';

const PinsGrid = ({ q, categoryName }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all Pins
  useEffect(() => {
    const unsb = onSnapshot(q, (snapshot) => {
      const pins = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      // setLastPin(snapshot.docs[snapshot.docs.length - 1]);
      setPins(pins);
      setLoading(false);
    });

    return () => unsb;
  }, [q, categoryName]);

  // // Create an Observer
  // const observer = new IntersectionObserver(
  //   (entries) => {
  //     const lastVisible = entries[0];
  //     if (!lastVisible.isIntersecting) return;
  //     observer.unobserve(pinsRef.current.lastChild);
  //     // Fetch More Data
  //     const moreQuery = query(q, startAfter(lastPin));
  //     getDocs(moreQuery).then((snapshot) => {
  //       const result = snapshot.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       if (snapshot.docs.length > 0)
  //         setLastPin(snapshot.docs[snapshot.docs.length - 1]);
  //       setPins((prev) => [...prev, ...result]);
  //     });
  //   },
  //   {
  //     threshold: 1,
  //   }
  // );

  // // Set an observer to lastpin
  // useEffect(() => {
  //   if (pinsRef.current !== undefined && pins.length > 0) {
  //     observer.observe(pinsRef.current.lastChild);
  //   }
  // }, [lastPin]);

  if (loading) {
    return <Loading />;
  }

  if (pins.length === 0) {
    return <NoPins />;
  }

  return (
    <div className="columns-2 laptop:columns-3 desktop:columns-4 mb-16">
      {pins.map((pin) => (
        <Pin key={pin.id} pinData={pin} />
      ))}
    </div>
  );
};

export default PinsGrid;
