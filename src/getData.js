export default function getData() {
    const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        if (request.status !== 200) {
          alert(`Error ${request.status}: ${request.statusText}`);
        } else {
            alert(request.response.data);
          return request.response.data;
        }
    };
}