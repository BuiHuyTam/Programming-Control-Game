class ArrayUtils {
  static parse2D(array) {
    const rows = [];
    for (let i = 0; i < array.length; i += 16) {
      rows.push(array.slice(i, i + 16));
    }
    return rows;
  }

  static createObjectsFrom2D(array) {
    const objects = [];
    array.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 292 || symbol === 250) {
          objects.push(
            new CollisionBlock({
              position: {
                x: x * 64,
                y: y * 64,
              },
            })
          );
        }
      });
    });

    return objects;
  }
}
