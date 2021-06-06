async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

   const cResponse = await fetch(`/api/comments/${id}`, {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   })
   .then(response => response.json());

   for(let i = 0; i < cResponse.length; i++){
       console.log(cResponse[i].id);
       await fetch(`/api/comments/${cResponse[i].id}`, {
           method: 'DELETE'
       });
       console.log(`Deleted ${cResponse[i].id}`);
   }

   const response = await fetch(`/api/posts/${id}`, {
       method: 'DELETE'
   });
   if(response.ok){
       document.location.replace('/dashboard/');
   } else {
       alert(response.statusText);
   }
}

document.querySelector('.deleteBtn').addEventListener('click', deleteFormHandler);