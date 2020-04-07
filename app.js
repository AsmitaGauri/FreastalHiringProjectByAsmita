var express=require("express"),
methodOverride=require("method-override"),
bodyParser =require("body-parser"),
app= express(),
mongoose=require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/intern_app_1");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var studentSchema =mongoose.Schema({
	name:String,
	age:Number,
	Std:Number
});
var Student=mongoose.model("Student",studentSchema);

// Student.create({
// 	name:"Asmita",
// 	age:14,
// 	Std: 7
// });
app.get("/",function(req,res){
	res.redirect("/students");
});

app.get("/students",function(req,res){
	Student.find({},function(err,students){
		if(err){
			console.log(err);
		}else{
			res.render("index",{students:students});
		}
	});
	
});

app.get("/students/new",function(req,res){
	res.render("new");
});

app.post("/students",function(req,res){
	Student.create(req.body.student,function(err,student){
		if(err){
			res.render("new");
		}else{
			res.redirect("/students");
		}
	});
});

app.get("/students/:id",function(req,res){
	Student.findById(req.params.id,function(err,student){
		if(err){
			res.redirect("/students");
		}else{
			res.render("show",{student:student});
		}
	});
});

app.get("/students/:id/edit",function(req,res){
	Student.findById(req.params.id,function(err,student){
		if(err){
			res.redirect("/students");
		}else{
			res.render("edit",{student:student});
		}
	});
});
app.put("/students/:id",function(req,res){
	Student.findByIdAndUpdate(req.params.id,req.body.student,function(err,student){
		if(err){
			res.redirect("/students");
		}else{
			res.redirect("/students/"+req.params.id)
		}
	});
});
app.delete("/students/:id",function(req,res){
	Student.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/students");
		}else{
			res.redirect("/students");
		}
	});
});





app.listen(3000,process.env.IP,function(){
	console.log("Server Started................");
});