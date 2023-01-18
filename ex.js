const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello there');
});
const courses = [
    {id: 1, name:'Web Development'},
    {id:2, name: 'IT'},
    {id:3, name: 'Cybersecurity'},
];

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if (!course){
        res.status(404).send("The course with the given ID was not found");
        return
    }

    res.send(course);
})

app.post('/api/courses', (req,res)=>{
    // you write the if code here
    //add an if statement so that the name of the course you post is .min(3) characters 
    if(req.body.name.length > 3){
        const course ={
            //we assign an ID and a name property
            id: courses.length +1,
            name: req.body.name
        };
        //YOU WRITE THE NEXT LINES OF code
        //next step: push it to the array
        courses.push(course);
        //next step: the server should return the new resource to the client in the body of the response
        
        
        res.send(course);
    } else {
        res.status(404).send("A name is required and should be greater than 3 characters long")
    }

});


app.put('/api/courses/:id', (req,res)=>{
    //Write the code in order to look up the course, if not existing return a 404
    n = true;
    courses.forEach(element => {
        if(req.body.name === element.name){
            n = false;
            res.status(404).send("Course already exists")
        }
    });
    if (n){
        const course ={
            //we assign an ID and a name property
            id: req.body.id,
            name: req.body.name
        };
        courses.splice(req.body.id - 1, 1, course);
        res.send(course);
    }
            //otherwise 
                    //update the course
                    //return the updated course
});

app.delete('/api/courses/:id', (req,res)=>{
    //code the following logic
    //look up the course by id
        //return 404 if does not exist
        //delete the course by index HINT: use the indexOf() and splice() methods
        // return the response to the client the course that was deleted
    if (courses.forEach(element => {
        if(element.id === req.body.id){
            return false;
        }
    })){
        res.status(404).send("Course doesn't exist")
    } else {
        const delcourse = courses.slice(req.body.id -1, req.body.id);
        courses.splice(req.body.id - 1, 1);
        res.send(delcourse);
    }

});

    
    
app.listen(3000, () => {
    console.log('Listening om port 3000...')
})