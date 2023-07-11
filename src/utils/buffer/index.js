export default function buffer() {
  let list = [];
  let timeId = null;

  const put = (item) => {
    list.push(item);
  };

  const take = () => {
    return list.shift();
  };

  const takeAll = () => {
    const res = list.concat();
    list = [];

    return res;
  };

  const getLast = () => {
    return list[list.length - 1];
  };

  return {
    put,
    take,
    takeAll,
    getLast,
    timeOut: (ms) => {
      return new Promise((resolve) => {
        if (timeId) return;

        timeId = window.setTimeout(() => {
          resolve(takeAll());
          timeId = null;
        }, ms);
      });
    },
  };
}
