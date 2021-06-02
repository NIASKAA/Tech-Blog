async function newFormHandler(event) {
    event.preventDefault();

    commentBody = document.querySelector('input[name="comment-body"]').value.trim();
    post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length() - 1
    ];

    if(commentBody){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                commentBody,
                post_id
            }),
            headers: {
                'content-Type': 'application/json'
            }
        });
        if(response.ok){
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('comment-form').addEventListener('submit', newFormHandler);