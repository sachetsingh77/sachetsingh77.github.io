<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<link rel="stylesheet" type="text/css" media="screen" href="/pareekshaweb/jsp/theme/jqgrid/ui.jqgrid.css" />
	<link rel="stylesheet" type="text/css" media="screen" href="/pareekshaweb/jsp/theme/jqgrid/layout-default-latest.css" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<script src="/pareekshaweb/jsp/js/jqgrid/jquery-1.7.2.min.js" type="text/javascript"></script>
<script src="/pareekshaweb/jsp/js/jqgrid/jquery.jqGrid.min.js" type="text/javascript"></script>
<script src="/pareekshaweb/jsp/js/jqgrid/i18n/grid.locale-en.js" type="text/javascript"></script>
<script src="/pareekshaweb/jsp/js/jquery/jquery-ui-1.8.2.custom.min.js" type="text/javascript"></script>
<script src="/pareekshaweb/jsp/js/jquery/jquery.layout.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" media="screen" href="/pareekshaweb/jsp/theme/jqgrid/jquery-ui-1.8.16.custom.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/pareekshaweb/jsp/theme/jqgrid/ui.jqgrid.css" />
<link rel="stylesheet" type="text/css" media="screen" href="/pareekshaweb/jsp/theme/jqgrid/ui.multiselect.css" />
<link rel="stylesheet" type="text/css" href="/pareekshaweb/jsp/theme/jqgrid/pareeksha.css" />
<title>A4App | Pareeksha</title>
<style>
html, body {
	margin: 0;			/* Remove body margin/padding */
	padding: 0;
	overflow: hidden;	/* Remove scroll bars on browser window */	
}
</style>
<script type="text/javascript">
var maintab;
var tabsLoadingArray = new Array();
var updateLoadingArray = new Array();
var newTabCountArray = new Array();
var opentabsArray;
jQuery(document).ready(function(){
	opentabsArray = {};
	$('body').layout({
		resizerClass: 'ui-state-default',
        west__onresize: function (pane, $Pane) {
            jQuery("#west-grid").jqGrid('setGridWidth',$Pane.innerWidth()-2);
		},
		west: {
			resizable:false
		},
		north: {
			size:"auto", spacing_open: 0, closable:false, resizable:false
		}
	});

		$.jgrid.defaults = $.extend($.jgrid.defaults,{loadui:"enable"});
	maintab =jQuery('#tabs','#RightPane').tabs({
        add: function(e, ui) {
            $(ui.tab).parents('li:first')
                .append('<span class="ui-tabs-close ui-icon ui-icon-close" title="Close Tab"></span>')
                .find('span.ui-tabs-close')
		.click(function() {
			for (var l=0;l<tabsLoadingArray.length;l++){
			var tabid = tabsLoadingArray[l];
			if (ui.panel.id == 't'+tabid){
				tabsLoadingArray.splice(l, 1);
			}
	}
	for (var item in opentabsArray) {
	if (ui.panel.id == 't'+item)
   		 delete opentabsArray[item];
}
	
                    maintab.tabs('remove', $('li', maintab).index($(this).parents('li:first')[0]));
                });
            // select just added tab
            maintab.tabs('select', '#' + ui.panel.id);
        },
		remove: function (event, ui){
			$("#displayedTab").val(ui.tab.innerHTML);
			var selectedTab = $("#displayedTab").val();
			var navType = selectedTab.substring(6, selectedTab.length-7);
			$("#"+navType+"-tradePeriodmenu").remove();
		},
	   show: function(event, ui){
			$("#displayedTab").val(ui.tab.innerHTML);
			var selectedTab = $("#displayedTab").val();
			var navType = selectedTab.substring(6, selectedTab.length-7);
			var navID= 'NavID-' + navType;
			var imgid='load_waiting_img';
			var thistabloaded = true;
			for (var l=0;l<tabsLoadingArray.length;l++){
				var tabid = tabsLoadingArray[l];
				if (tabid == navID){
					thistabloaded = false;
				}
			}
			var isLoadByUpdate = true;
			for (var l=0;l<updateLoadingArray.length;l++){
				var tabid = updateLoadingArray[l];
				if (navID == tabid){
					isLoadByUpdate = true;
					break;
				}
			}
			if (thistabloaded==false){
				if(!isLoadByUpdate){
					$('#' +imgid).css('display','');
				}
			}
			else{
				$('#' +imgid).css('display','none');
			}
		}		
    	});
   jQuery("#west-grid").jqGrid({
	        treeGrid: true,
                treeGridModel: "adjacency",
                ExpandColumn: 'name',
                ExpandColClick: true,
                url:"/pareekshaweb/rest/navigation/tree",
                datatype:"json",
                colNames:['id','Name','Url'],
                colModel:[ {name:'id', index:'id', hidden:true, key:true},
                           {name:'name', index:'name', sorttype:"text", width:3},
                           {name:'url',index:'url',hidden:true, sorttype:'text',sortable:false,hidden:true}],
                jsonReader:{ repeatitems:false
                            ,cell:""
                           },
                autowidth:true,
                height:"auto",
		hoverrows:true,
                hidegrid: false,
                loadonce: true,
                loadui: 'block',
                sortname: "name",
		rowNum:50,
                caption: "Pareeksha",
        	treeIcons: {leaf:'ui-icon-document-b'},
		onSelectRow: function(rowid) {
            var treedata = $("#west-grid").jqGrid('getRowData',rowid);
            if(treedata.isLeaf=="true") {
                var st = "#t"+treedata.id;
				if($(st).html() != null ) {
					maintab.tabs('select',st);
				} else {
					
						maintab.tabs('add',st, treedata.name);
						tabsLoadingArray.push(treedata.id);
						var imgId =  'load_waiting_img';
						$('#' +imgId).css('display','');
						$(st,"#tabs").load(treedata.url);
						//tabsLoadingArray.push(treedata.id);
						opentabsArray[treedata.id]={url:treedata.name+':'+treedata.url};
						$("#"+treedata.name+"-jqrowid").val(rowid);
					
				}
            }
        },
loadComplete: function(data){

	var treedata = $("#west-grid").jqGrid('getRowData','NavID-Examinations-Active');
	var st = "#t"+treedata.id;
	maintab.tabs('add',st, treedata.name);
	tabsLoadingArray.push(treedata.id);
	$(st,"#tabs").load(treedata.url);
	opentabsArray[treedata.id]={url:treedata.name+':'+treedata.url};

		}


});

});
</script>	
</head>
<body>
	<input type="hidden" name="displayedTab" id="displayedTab" value="">
	<div id="LeftPane" class="ui-layout-west ui-widget">
		<table id="west-grid"></table>
	</div> <!-- #LeftPane -->
	<div id="RightPane" class="ui-layout-center ui-helper-reset" ><!-- Tabs pane -->
		<div id="switcher"></div>  
		<div id="tabs" class="jqgtabs">
			<ul>
			</ul> 
		</div> 
	</div> <!-- #RightPane -->

<!-- Branding Pane -->
<div id="NorthPane" class="ui-layout-north" >
	<div id="brand-area">
		<div id="brand">
			<img id="a4AppLogo" href="#" height="40px" width="300px;" src=""></img>
		</div>
		<div id="right">
			<ul >     
			<li><a  href="help/PareekshaHelp.html" target="_blank">Help</a>&nbsp;|</li>
			<li><a  href="" target="_top">Logout</a></li>
				<li><img id="poweredByIntegral" height="42" width="116" src="" /></li>
			</ul>
		</div>
	</div>
	<div class="clear"></div>
</div><!-- Branding Pane -->
</body>
</html>
<%
session.setAttribute("Namespace","412333-Govt School Sagar Karnataka");
String namespace = (String) session.getAttribute("Namespace");
System.out.println("Session Namespace " + namespace);
%>

