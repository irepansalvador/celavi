var treefile = document.getElementById('JSON_uploader');
start_files();
// disable tree options if tree is not loaded yet
document.getElementById("zoom_in_tree").disabled = true;
document.getElementById("zoom_out_tree").disabled = true;
document.getElementById("pan_down_tree").disabled = true;
document.getElementById("pan_up_tree").disabled = true;
document.getElementById("BranchLenghts").disabled = true;
document.getElementById("CollapseAll").disabled = true;
document.getElementById("Reset").disabled = true;
document.getElementById("Reset_cols_Tree").disabled = true;
document.getElementById("Tree_checkbox").disabled = true;

// disable 3d options if cells are not loaded 
document.getElementById("reset").disabled = true;
document.getElementById("CellSize").disabled = true;
document.getElementById("CellStroke").disabled = true;
document.getElementById("Cells_checkbox").disabled = true;


function activate_tree_controls() {
		var selectobject = document.getElementById("saved_clones");
		for (var i=selectobject.length-1; i>0; i--) {
			if (selectobject[i].value !== 'Saved clones')
				{selectobject[i].remove(i);}
		}
		
		//ENABLE  tree options if tree is loaded yet
	var tree_format = $("input[name='Tree_INPUT']:checked").val();
	if (tree_format=="json" || "newick")
		{
		document.getElementById("zoom_in_tree").disabled = false;
		document.getElementById("zoom_out_tree").disabled = false;
		document.getElementById("pan_down_tree").disabled = false;
		document.getElementById("pan_up_tree").disabled = false;
		document.getElementById("CollapseAll").disabled = false;
		document.getElementById("Reset").disabled = false;
		document.getElementById("Reset_cols_Tree").disabled = false;
		document.getElementById("Tree_checkbox").disabled = false;
		// disable 3d options if cells are not loaded 
		document.getElementById("reset").disabled = true;
		document.getElementById("CellSize").disabled = true;
		document.getElementById("CellStroke").disabled = true;
		document.getElementById("Cells_checkbox").disabled = true;

	if (Abs_BL < 2) {
			document.getElementById("BranchLenghts").disabled = false;
			}
		if (Abs_BL == 2) {
		document.getElementById("BranchLenghts").disabled = true;
			}
		}
	if (tree_format=="clones") {
		// disable tree options if tree is not loaded yet
		document.getElementById("zoom_in_tree").disabled = true;
		document.getElementById("zoom_out_tree").disabled = true;
		document.getElementById("pan_down_tree").disabled = true;
		document.getElementById("pan_up_tree").disabled = true;
		document.getElementById("BranchLenghts").disabled = true;
		document.getElementById("CollapseAll").disabled = true;
		document.getElementById("Reset").disabled = true;
		document.getElementById("Reset_cols_Tree").disabled = true;
		document.getElementById("Tree_checkbox").disabled = true;
		document.getElementById("Cells_checkbox").disabled = true;
		}
	}

function start_files() {
	document.getElementById('JSON_uploader').value = '';
	document.getElementById("3Dcoord_uploader").value = "";
	document.getElementById("3Dcoord_uploader").nextElementSibling.textContent = "Input coordinates file";
	document.getElementById("Newick_TREE").disabled = true;
	document.getElementById("Json_TREE").disabled = true;
	document.getElementById("Json_CLONES").disabled = true;
	document.getElementById("Abs_BL").disabled = true;
	document.getElementById("Rel_BL").disabled = true;
	document.getElementById("No_BL").disabled = true;
	// remove button to hide/table
	var x = document.getElementById("Hide_metadata");
	if (x.style.display === "block") {x.style.display = "none";}
	d3.select("#HM_scale").selectAll("svg").remove();
	d3.select("#HM_scale").attr("title", "");
	d3.select("#HM_scale").select("h5").text("");
	if (document.getElementById("Cells_checkbox").checked == true)
		{document.getElementById("Cells_checkbox").click()}
	}


treefile.addEventListener('change', showtreeopts);
function showtreeopts() 
	{console.log("lets see");
	var tmpname = document.getElementById("JSON_uploader").files[0].name;
	document.getElementById("JSON_uploader").nextElementSibling.textContent = tmpname;
	document.getElementById("Newick_TREE").disabled = false;
	document.getElementById("Json_TREE").disabled = false;
	document.getElementById("Json_CLONES").disabled = false;
	document.getElementById("Abs_BL").disabled = false;
	document.getElementById("Rel_BL").disabled = false;
	document.getElementById("No_BL").disabled = false;
	}




$(document).ready(function () 
	{ 
	$("#Json_TREE").click(function()
		{console.log("you clicked json, restart file");
//		$("input[name=TREE_FILE]").val("");
		});
	});
$(document).ready(function () 
	{ 
	$("#Newick_TREE").click(function()
		{console.log("you clicked Newick, restart file");
//		$("input[name=TREE_FILE]").val("");
		});
	});
$(document).ready(function ()
	{ 
	$("#Json_CLONES").click(function()
		{console.log("you clicked clones, restart file");
//		$("input[name=TREE_FILE]").val("");
		});
	});
$(document).ready(function ()
	{ 
	$("#Rel_BL").click(function()
		{console.log("you clicked for Relative Branch lenghts");
		//set_bl();
				//		Abs_BL = 0;
//		update(root);
		});
	});
$(document).ready(function ()
	{ 
	$("#Abs_BL").click(function()
		{console.log("you clicked for Absolute Branch lenghts");
		//set_bl();
//		Abs_BL = 1;
//		update(root);
		});
	});

function HideINPUT()
	{
	var x = document.getElementById("input_submit");
  if (x.style.display === "none") {
	    x.style.display = "block";
	 } else {
	    x.style.display = "none";
	  }
	}
function HideMETADATA()
	{
	var x = document.getElementById("metadata_table");
  if (x.style.display === "none") {
	    x.style.display = "block";
	 } else {
	    x.style.display = "none";
	  }
	}

function Submit_Function() 
	{
	// Remove the slider if exists
	d3.select("#slider").selectAll("input").remove();
	d3.select("#slider").selectAll("svg").remove();
	// remove the previous line
	d3.select("#area1").select("svg").select("g").selectAll("*").remove();
	d3.select("#area1").select("div").remove();
	// remove metadata table
	d3.select("#metadata_table").remove();
	// remove 3d plot if exists 
	if (data.length>0)
		{data[0].x = data[0].y = data[0].z = data[0].id = data[0].text = [];
		Plotly.newPlot(area2, data, layout)};
	
	// Get the format of the file
	console.log("SUBMITTED!!!");
	var uploader = document.getElementById("JSON_uploader"); 
	console.log(uploader);

	//Get the Branch length option
	var BL_option = $("input[name='Abs_Rel']:checked").val(); 
	if (BL_option == "abs") {Abs_BL = 1;}
	if (BL_option == "rel") {Abs_BL = 0;}
	if (BL_option == "no") {Abs_BL = 2;}

	//Create a reader function depending on the format of the tree
	var json_reader = new FileReader();
	json_reader.onload = function(e) {
		var contents = e.target.result;
		// check if the format is correct
		IsJsonString(contents);
		// --------------------
		load_dataset_json(contents);
	};
	var newick_reader = new FileReader();
	newick_reader.onload = function(e) {
		var contents = e.target.result;
		var newick = Newick.parse(contents);
		load_dataset_newick(newick);
	};
	var clones_reader = new FileReader();
	clones_reader.onload = function(e) {
		var contents = e.target.result;
		// check if the format is correct
		IsJsonString(contents);
		// --------------------
	load_dataset_clones(contents);
	};

	// function to call the reader 
	function handleFiles() {
		var tree_format = $("input[name='Tree_INPUT']:checked").val();
		console.log(tree_format);
		if (tree_format=="json")
			{
			//d3.select("#area2").text("loading...");
			var file = uploader.files[0];
			try {json_reader.readAsText(file);
				} catch (e) {
				alert("Error loading file\nHave you selected a file already?")
				}
			console.log(file);
			activate_tree_controls();
			}
		if (tree_format=="newick")
			{
			//d3.select("#area2").text("loading...");
			var file = uploader.files[0];
			try {newick_reader.readAsText(file);
					console.log("file selected");
					// test newick ----------------------
					var form_data = new FormData();                  
					form_data.append('file', file);
					//alert(form_data);                             
					$.ajax({
						url: 'upload.php', // point to server-side PHP script 
						dataType: 'text',  // what to expect back from the PHP script, if anything
						cache: false,
						contentType: false,
						processData: false,
						data: form_data,                         
						type: 'post',
						success: function(php_script_response){
							alert(php_script_response); // display response from the PHP script, if any
							}
						});
			//-----------------------------------
			} catch (e) { alert(e);
			alert("Error loading file\nHave you selected a file already?")
			}
			console.log(file);
			activate_tree_controls();
		}
		if (tree_format=="clones")
			{
			//d3.select("#area2").text("loading...");
			var file = uploader.files[0];
			try{clones_reader.readAsText(file);
				} catch (e) {
				alert("Error loading file\nHave you selected a file already?")
				}
			console.log(file);
			activate_tree_controls();
			}
	};

	// HERE I CALL THE READER FUNCTION
	handleFiles();
	// print the name of the file on the box
	var str = $("input[name=TREE_FILE]").val()
	var res = str.split("\\");
	$("label[for=JSON_uploader").text(res[res.length-1]);
	// restart files
	start_files();
	};

// FUNCTIONS TO CHECK FILE FORMATS
function IsJsonString(str) {
	// define function to print error
	var printError = function(error, explicit) {
		alert(`[${explicit ? 'JSON format error. Make sure the file selected is in JSON format' : 
				'INEXPLICIT'}] ${error.name}: ${error.message}`);
		};
	try {JSON.parse(str); 
		} catch (e) {
		if (e instanceof SyntaxError) {
			printError(e, true);
			} else {
			printError(e, false);
			}
		}
	}
