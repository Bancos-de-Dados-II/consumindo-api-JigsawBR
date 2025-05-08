async function API(params) {
    fetch("http://localhost:3000/tasks")
            .then(response =>{
                response.json().then(task =>{
                    console.log(task)
                })
            })
}