function displaySportList(data){
    console.log('data: ', data)
  
      $('.post-list').html("");
  
      for (let i = 0; i < data.posts.length; i ++){
          $('.post-list').append(`<li>
                    Id: ${data.posts[i].id}
                    Title: ${data.posts[i].title}
                    Content: ${data.posts[i].content}
                                    </li>`);
      }
  
  }
  
  function onload(){
      let url = 'http://localhost:8080/posts/api/list-posts';
      let settings = {
          method : 'GET',
          headers : {
              'Content-Type' : 'application/json'
          }
      };
  
      fetch(url, settings)
          .then(response => {
              if (response.ok){
                  return response.json();
              }
              throw new Error(response);
          })
          .then(responseJSON => {
              displaySportList(responseJSON);
          })
          .catch(err => {
              console.log(err);
          });
  }
  
  function addNewPost(post){
  
      let url = 'http://localhost:8080/posts/api/post-post';
      let settings = {
                          method : 'POST',
                          headers : {
                              'Content-Type' : 'application/json'
                          },
                          body : JSON.stringify(post)
                      };
  
      fetch(url, settings)
          .then(response => {
              if (response.ok){
          console.log('response: ', response)
                  return response.json();
              }
              else{
                  return new Promise(function(resolve, reject){
                      resolve(response.json());
                  })
                  .then(data =>{
                      throw new Error(data.message);
                  })
              }
          })
          .then(responseJSON => {
        onload()
              // updateSportList(responseJSON);
          })
          .catch(err => {
              console.log(err);
          });
  }
  
  function editPost(post){
    console.log('post: ', post)
    console.log('post.id: ', post.id)
      let url = 'http://localhost:8080/posts/api/update-post/' + post.id;
      let settings = {
                          method : 'PUT',
                          headers : {
                              'Content-Type' : 'application/json'
                          },
                          body : JSON.stringify({content: post.content})
                      };
  
      fetch(url, settings)
          .then(response => {
              if (response.ok){
          console.log('response: ', response)
                  return response.json();
              }
              else{
                  return new Promise(function(resolve, reject){
                      resolve(response.json());
                  })
                  .then(data =>{
                      throw new Error(data.message);
                  })
              }
          })
          .then(responseJSON => {
        onload()
              // updateSportList(responseJSON);
          })
          .catch(err => {
              console.log(err);
          });
  }
  
  function deletePost(id){
      let url = 'http://localhost:8080/posts/api/delete-post/' + id;
      let settings = {
                          method : 'DELETE',
                          headers : {
                              'Content-Type' : 'application/json'
                          },
                          body : JSON.stringify({id})
                      };
  
      fetch(url, settings)
          .then(response => {
              if (response.ok){
          console.log('response: ', response)
                  return response.json();
              }
              else{
                  return new Promise(function(resolve, reject){
                      resolve(response.json());
                  })
                  .then(data =>{
                      throw new Error(data.message);
                  })
              }
          })
          .then(responseJSON => {
        onload()
              // updateSportList(responseJSON);
          })
          .catch(err => {
              console.log(err);
          });
  }
  
  function watchForm(){
      $('.postForm').on('submit', function(event) {
          event.preventDefault();
          let id = $('.id').val();
          let title = $('.title').val();
          let content = $('.content').val();
      let author = $('.author').val();
      let post = {
        id,
        title,
        content,
        author,
      }
          addNewPost(post);
    });
    $('.editForm').on('submit', function(event) {
          event.preventDefault();
          let id = $('.editId').val();
          let content = $('.editContent').val();
      let post = {
        id,
        content,
      }
          editPost(post);
    });
    $('.deleteForm').on('submit', function(event) {
          event.preventDefault();
          let id = $('.deleteId').val();
          deletePost(id);
      });
  }
  
  function init(){
      $(onload);
      $(watchForm);
  }
  
  $(init);
  