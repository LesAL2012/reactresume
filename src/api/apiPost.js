export const apiPostLoadFile = (sendFile) => {
  let formData = new FormData();
  formData.append("sendedFile", sendFile);
  //return fetch('https://cors-anywhere.herokuapp.com/https://react.ts.biz.ua/fileLoader.php',
  //  { method: "POST", body: formData },
  //)
  return fetch('https://react.ts.biz.ua/fileLoader.php',
    { method: "POST", body: formData },
  )
    .then(resp => resp.json())
}
