// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) {
  var mypre = document.getElementById("output");
  mypre.innerHTML = mypre.innerHTML + text;
}
function builtinRead(x) {
  if (
    Sk.builtinFiles === undefined ||
    Sk.builtinFiles["files"][x] === undefined
  )
    throw "File not found: '" + x + "'";
  return Sk.builtinFiles["files"][x];
}

/**
 * Here's everything you need to run a python program in skulpt
 * grab the code from your textarea
 * get a reference to your pre element for output
 * configure the output function
 * call Sk.importMainWithBody()
 */

// function runit() {
//   var commandsText = document.getElementById("yourcode").value;
//   var commandsArray = commandsText.split("\n"); // Tách các dòng thành một mảng

//   Sk.pre = "output";
//   Sk.configure({ output: outf, read: builtinRead });
//   if (commandsArray.length <= 1) {
//     var myPromise = Sk.misceval.asyncToPromise(function () {
//       return Sk.importMainWithBody("<stdin>", false, commandsText, true);
//     });
//     myPromise.then(
//       function (mod) {
//         console.log("success");
//       },
//       function (err) {
//         console.log(err.toString());
//       }
//     );
//   } else {
//     commandsArray.forEach(function (command) {
//       var myPromise = Sk.misceval.asyncToPromise(function () {
//         return Sk.importMainWithBody("<stdin>", false, command, true);
//       });

//       myPromise.then(
//         function (mod) {
//           console.log("Command executed successfully");
//         },
//         function (err) {
//           console.log(err.toString());
//         }
//       );
//     });
//   }
// }

function runit() {
  var prog = document.getElementById("yourcode").value;
  var mypre = document.getElementById("output");
  mypre.innerHTML = "";
  Sk.pre = "output";
  Sk.configure({ output: outf, read: builtinRead });
  var myPromise = Sk.misceval.asyncToPromise(function () {
    return Sk.importMainWithBody("<stdin>", false, prog, true);
  });
  myPromise.then(
    function (mod) {
      console.log("success");
    },
    function (err) {
      console.log(err.toString());
    }
  );
}
