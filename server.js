var express = require('express');
var app = express();
var querystring = require('querystring');
var https = require('https');
var request = require('request');
var path =require('path');
var fs=require('fs');
var mime = require('mime')
const bodyParser = require('body-parser');
var token;
var user;
var key='g8jc7g';
var id=11347;
var x = 10

//var host ='https://c4arw748.caspio.com';
app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
//app.use(express.static('public'));

console.log(process.env.GRANT)
//	client__id: process.env.CLIENTID,
//	client_secret: process.env.CLIENTSECRET


var data=
	    {
			grant_type: process.env.GRANT,
			client_id: process.env.CLIENTID,
      client_secret: process.env.CLIENTSECRET
		}


	//getting  token
function get_token(){
	console.log('getting token');
		var headers = {
				 'Content-Type':'application/json'
				}

			// Configure the request
			var options = {
				url: 'https://c3cmr837.caspio.com/oauth/token',
				method: 'POST',
				headers: headers,
				form: data
			}

			// Start the request
			request(options, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					// Print out the response body
					let json =JSON.parse(body);
					//console.log(json);
					token=json.access_token;
					//console.log(token);

				}
			})
	}

//getting data
function get_data(token){
  console.log(token);
   console.log('getting data');
	token=token;
const options ={
	//url:'https://c3cmr837.caspio.com/rest/v1/tables/AnalysisQuestions/rows?q=%7B%22select%22%3A%22*%22%2C%22where%22%3A%22Date_Submitted%3E%3DGetDate%28%29%22%7D',
	url:'https://c3cmr837.caspio.com/rest/v1/tables/AnalysisQuestions/rows?q=%7B%22select%22%3A%22*%22%2C%22orderby%22%3A%22Time_Submitted+desc%22%2C%22limit%22%3A1%7D',
	method:'GET',
	headers:{
		'Accept':'application/json',
		'authorization':'bearer '+token
	}
};
request(options, function (error, response, body) {
	var data=JSON.parse(body);
	user=data.Result;
	console.log(user[0]);
	// creat_doc();
	merge_doc(key,id);


});
}

//merge document
function merge_doc(key,id){
	console.log('merging');
	if(user){
	var key=key;
	var id=id;
	var url='https://www.webmerge.me/route/'+id+'/'+key+'?download=1';
	 //var file = fs.createWriteStream("file.pdf");
	    const options ={
		url:url,

	headers:{
		'Accept':'application/json'
		},
	form:{
		            //mapping caspio data and webmerge

							"Company":user[0].About_G,
							"Date":user[0].Date,
							"Zipcode":user[0].Zipcode_G,
							"City":user[0].City_G,
							"State":user[0].State_G,
							"Street":user[0].Address_G,
							"MultiEIN":user[0].MultiEIN_G,
							"Entity1":user[0].Entity1_G,
							"Entity2":user[0].Entity2_G,
							"Entity3":user[0].Entity3_G,
							"Entity4":user[0].Entity4_G,
							"Entity5":user[0].Entity5_G,
							"Entity6":user[0].Entity6_G,
							"AddEntity2":user[0].NextEntity1_G,
							"AddEntity3":user[0].NextEntity2_G,
							"AddEntity4":user[0].NextEntity3_G,
							"AddEntity5":user[0].NextEntity4_G,
							"AddEntity6":user[0].NextEntity5_G,
							"DeliveryLoc1":user[0].Locations1_G,
							"DeliveryLoc2":user[0].Locations2_G,
							"DeliveryLoc3":user[0].Locations3_G,
							"DeliveryLoc4":user[0].Locations4_G,
							"DeliveryLoc5":user[0].Locations5_G,
							"DeliveryLoc6":user[0].Locations6_G,
							"FederalIDs":user[0].Federal_IDS_G,
							"FirstName":user[0].NameF_G,
							"LastName":user[0].NameL_G,
							"Title":user[0].Title_G,
							"Email":user[0].Email_G,
							"RecordID":user[0].Record_ID,
							"NutshellID":user[0].Nutshell_ID_G,
							"PopulateHR":user[0].Populate_HR,
							"FullHR":user[0].Full_HR,
							"PopulateTA":user[0].Populate_TA,
							"NeedTA":user[0].Need_TA,
							"Clock1":user[0].Clock_TAC,
							"ClockAmount":user[0].Numberof_TAC,
							"Clock2":user[0].Clock2_TAC,
							"TLM1":user[0].TLM1_TA,
							"TLM2":user[0].TLM2_TA,
							"TLM3":user[0].TLM3_TA,
							"TLM4":user[0].TLM4_TA,
							"TLM5":user[0].TLM5_TA,
							"TLM6":user[0].TLM6_TA,
							"PopulatePR":user[0].Populate_PR,
							"MultiFreq1":user[0].Multi_Freq_1_PR,
							"MultiFreq2":user[0].Multi_Freq_2_PR,
							"MultiFreq3":user[0].Multi_Freq_3_PR,
							"MultiFreq4":user[0].Multi_Freq_4_PR,
							"MultiFreq5":user[0].Multi_Freq_5_PR,
							"MultiFreq6":user[0].Multi_Freq_6_PR,
							"HRDemandAmount":user[0].HR_Logins_MS,
							"SOAPCalls":user[0].SOAPCalls1_MS,
							"BA1":user[0].BA_ACA_Cost1,
							"BA2":user[0].BA_ACA_Cost2,
							"BA3":user[0].BA_ACA_Cost3,
							"BA4":user[0].BA_ACA_Cost4,
							"BA5":user[0].BA_ACA_Cost5,
							"BA6":user[0].BBA_ACA_Cost6,
							"ACA1":user[0].ACA_Cost1,
							"ACA2":user[0].ACA_Cost2,
							"ACA3":user[0].ACA_Cost3,
							"ACA4":user[0].ACA_Cost4,
							"ACA5":user[0].ACA_Cost5,
							"ACA6":user[0].ACA_Cost6,
							"HRIS1":user[0].HRISCost1,
							"HRIS2":user[0].HRISCost2,
							"HRIS3":user[0].HRISCost3,
							"HRIS4":user[0].HRISCost4,
							"HRIS5":user[0].HRISCost5,
							"HRIS6":user[0].HRISCost6,
							"EDI1":user[0].EDICost1,
							"EDI2":user[0].EDICost2,
							"EDI3":user[0].EDICost3,
							"EDI4":user[0].EDICost4,
							"EDI5":user[0].EDICost5,
							"EDI6":user[0].EDICost6,
							"HRDemand":user[0].HR_Demand_Cost,
							"TLM1":user[0].TLMCost1,
							"TLM2":user[0].TLMCost2,
							"TLM3":user[0].TLMCost3,
							"TLM4":user[0].TLMCost4,
							"TLM5":user[0].TLMCost5,
							"TLM6":user[0].TLMCost6,
							"TLMCostPer":user[0].TLMCostPer,
							"DeliveryCost1":user[0].DeliveryCost1,
							"DeliveryCost2":user[0].DeliveryCost2,
							"DeliveryCost3":user[0].DeliveryCost3,
							"DeliveryCost4":user[0].DeliveryCost4,
							"DeliveryCost5":user[0].DeliveryCost5,
							"DeliveryCost6":user[0].DeliveryCost6,
							"PayrollSU1":user[0].PayrollSU1,
							"PayrollSU2":user[0].PayrollSU2,
							"PayrollSU3":user[0].PayrollSU3,
							"PayrollSU4":user[0].PayrollSU4,
							"PayrollSU5":user[0].PayrollSU5,
							"PayrollSU6":user[0].PayrollSU6,
							"EverifySU1":user[0].EverifySU1,
							"EverifySU2":user[0].EverifySU2,
							"EverifySU3":user[0].EverifySU3,
							"EverifySU4":user[0].EverifySU4,
							"EverifySU5":user[0].EverifySU5,
							"EverifySU6":user[0].EverifySU6,
							"SSSU1":user[0].SocialSU1,
							"SSSU2":user[0].SocialSU2,
							"SSSU3":user[0].SocialSU3,
							"SSSU4":user[0].SocialSU4,
							"SSSU5":user[0].SocialSU5,
							"SSSU6":user[0].SocialSU6,
							"EDIFeeds":user[0].Benefit_carriers_HR,
							"EDISU":user[0].EDISU,
							"TASU1":user[0].T_ASU1,
							"TASU2":user[0].T_ASU2,
							"TASU3":user[0].T_ASU3,
							"TASU4":user[0].T_ASU4,
							"TASU5":user[0].T_ASU5,
							"TASU6":user[0].T_ASU6,
							"HRISSU1":user[0].HRSU1,
							"HRISSU2":user[0].HRSU2,
							"HRISSU3":user[0].HRSU3,
							"HRISSU4":user[0].HRSU4,
							"HRISSU5":user[0].HRSU5,
							"HRISSU6":user[0].HRSU6,
							"GLSU1":user[0].GLSU1,
							"GLSU2":user[0].GLSU2,
							"GLSU3":user[0].GLSU3,
							"GLSU4":user[0].GLSU4,
							"GLSU5":user[0].GLSU5,
							"GLSU6":user[0].GLSU6,
							"TimeoffSU1":user[0].TimeoffSU1,
							"TimeoffSU2":user[0].TimeoffSU2,
							"TimeoffSU3":user[0].TimeoffSU3,
							"TimeoffSU4":user[0].TimeoffSU4,
							"TimeoffSU5":user[0].TimeoffSU5,
							"TimeoffSU6":user[0].TimeoffSU6,
							"StLocalTotal1":user[0].StateLocalTotal1,
							"StLocalTotal2":user[0].StateLocalTotal2,
							"StLocalTotal3":user[0].StateLocalTotal3,
							"StLocalTotal4":user[0].StateLocalTotal4,
							"StLocalTotal5":user[0].StateLocalTotal5,
							"StLocalTotal6":user[0].StateLocalTotal6,
							"PerProcessCost1":user[0].PerProcessTotal1,
							"PerProcessCost2":user[0].PerProcessTotal2,
							"PerProcessCost3":user[0].PerProcessTotal3,
							"PerProcessCost4":user[0].PerProcessTotal4,
							"PerProcessCost5":user[0].PerProcessTotal5,
							"PerProcessCost6":user[0].PerProcessTotal6,
							"MonthlyCost1":user[0].MonthlyTotal1,
							"MonthlyCost2":user[0].MonthlyTotal2,
							"MonthlyCost3":user[0].MonthlyTotal3,
							"MonthlyCost4":user[0].MonthlyTotal4,
							"MonthlyCost5":user[0].MonthlyTotal5,
							"MonthlyCost6":user[0].MonthlyTotal6,
							"SUFees1":user[0].SetupTotal1,
							"SUFees2":user[0].SetupTotal2,
							"SUFees3":user[0].SetupTotal3,
							"SUFees4":user[0].SetupTotal4,
							"SUFees5":user[0].SetupTotal5,
							"SUFees6":user[0].SetupTotalCost6,
							"StLocalCost1":user[0].StateLocalCost1,
							"StLocalCost2":user[0].StateLocalCost2,
							"StLocalCost3":user[0].StateLocalCost3,
							"StLocalCost4":user[0].StateLocalCost4,
							"StLocalCost5":user[0].StateLocalCost5,
							"StLocalCost6":user[0].StateLocalCost6,
							"Entity1emp":user[0].EmpTotal1,
							"Entity2emp":user[0].EmpTotal2,
							"Entity3emp":user[0].EmpTotal3,
							"Entity4emp":user[0].EmpTotal4,
							"Entity5emp":user[0].EmpTotal5,
							"Entity6emp":user[0].EmpTotal6,
							"WeeklyEmp1":user[0].WeeklyEmpCount1,
							"WeeklyEmp2":user[0].WeeklyEmpCount2,
							"WeeklyEmp3":user[0].WeeklyEmpCount3,
							"WeeklyEmp4":user[0].WeeklyEmpCount4,
							"WeeklyEmp5":user[0].WeeklyEmpCount5,
							"WeeklyEmp6":user[0].WeeklyEmpCount6,
							"BiWeeklyEmp1":user[0].BiWeeklyEmpCount1,
							"BiWeeklyEmp2":user[0].BiWeeklyEmpCount2,
							"BiWeeklyEmp3":user[0].BiWeeklyEmpCount3,
							"BiWeeklyEmp4":user[0].BiWeeklyEmpCount4,
							"BiWeeklyEmp5":user[0].BiWeeklyEmpCount5,
							"BiWeeklyEmp6":user[0].BiWeeklyEmpCount6,
							"SMEmp1":user[0].SemiMonthlyEmpCount1,
							"SMEmp2":user[0].SemiMonthlyEmpCount2,
							"SMEmp3":user[0].SemiMonthlyEmpCount3,
							"SMEmp4":user[0].SemiMonthlyEmpCount4,
							"SMEmp5":user[0].SemiMonthlyEmpCount5,
							"SMEmp6":user[0].SemiMonthlyEmpCount6,
							"MonthlyEmp1":user[0].MonthlyEmpCount1,
							"MonthlyEmp2":user[0].MonthlyEmpCount2,
							"MonthlyEmp3":user[0].MonthlyEmpCount3,
							"MonthlyEmp4":user[0].MonthlyEmpCount4,
							"MonthlyEmp5":user[0].MonthlyEmpCount5,
							"MonthlyEmp6":user[0].MonthlyEmpCount6,
							"CheckCost":user[0].PerCheckCost,
							"WeeklyBase1":user[0].WeeklyBaseCost1,
							"WeeklyBase2":user[0].WeeklyBaseCost2,
							"WeeklyBase3":user[0].WeeklyBaseCost3,
							"WeeklyBase4":user[0].WeeklyBaseCost4,
							"WeeklyBase5":user[0].WeeklyBaseCost5,
							"WeeklyBase6":user[0].WeeklyBaseCost6,
							"SMBase1":user[0].SemiMonthlyBaseCost1,
							"SMBase2":user[0].SemiMonthlyBaseCost2,
							"SMBase3":user[0].SemiMonthlyBaseCost3,
							"SMBase4":user[0].SemiMonthlyBaseCost4,
							"SMBase5":user[0].SemiMonthlyBaseCost5,
							"SMBase6":user[0].SemiMonthlyBaseCost6,
							"BiWeeklyBase1":user[0].BiWeeklyBaseCost1,
							"BiWeeklyBase2":user[0].BiWeeklyBaseCost2,
							"BiWeeklyBase3":user[0].BiWeeklyBaseCost3,
							"BiWeeklyBase4":user[0].BiWeeklyBaseCost4,
							"BiWeeklyBase5":user[0].BiWeeklyBaseCost5,
							"BiWeeklyBase6":user[0].BiWeeklyBaseCost6,
							"MonthlyBase1":user[0].MonthlyBaseCost1,
							"MonthlyBase2":user[0].MonthlyBaseCost2,
							"MonthlyBase3":user[0].MonthlyBaseCost3,
							"MonthlyBase4":user[0].MonthlyBaseCost4,
							"MonthlyBase5":user[0].MonthlyBaseCost5,
							"MonthlyBase6":user[0].MonthlyBaseCost6,
							"WeeklyPayroll1":user[0].WeeklyPayrollCost1,
							"WeeklyPayroll2":user[0].WeeklyPayrollCost2,
							"WeeklyPayroll3":user[0].WeeklyPayrollCost3,
							"WeeklyPayroll4":user[0].WeeklyPayrollCost4,
							"WeeklyPayroll5":user[0].WeeklyPayrollCost5,
							"WeeklyPayroll6":user[0].WeeklyPayrollCost6,
							"SMPayroll1":user[0].SemiMonthlyPayrollCost1,
							"SMPayroll2":user[0].SemiMonthlyPayrollCost2,
							"SMPayroll3":user[0].SemiMonthlyPayrollCost3,
							"SMPayroll4":user[0].SemiMonthlyPayrollCost4,
							"SMPayroll5":user[0].SemiMonthlyPayrollCost5,
							"SMPayroll6":user[0].SemiMonthlyPayrollCost6,
							"BiWeekPayroll1":user[0].BiWeeklyPayrollCost1,
							"BiWeekPayroll2":user[0].BiWeeklyPayrollCost2,
							"BiWeekPayroll3":user[0].BiWeeklyPayrollCost3,
							"BiWeekPayroll4":user[0].BiWeeklyPayrollCost4,
							"BiWeekPayroll5":user[0].BiWeeklyPayrollCost5,
							"BiWeekPayroll6":user[0].BiWeeklyPayrollCost6,
							"MonthlyPayroll1":user[0].MonthlyPayrollCost1,
							"MonthlyPayroll2":user[0].MonthlyPayrollCost2,
							"MonthlyPayroll3":user[0].MonthlyPayrollCost3,
							"MonthlyPayroll4":user[0].MonthlyPayrollCost4,
							"MonthlyPayroll5":user[0].MonthlyPayrollCost5,
							"MonthlyPayroll6":user[0].MonthlyPayrollCost6,
							"W2Fee":user[0].W2Fee,
							"Fee1094":user[0].i094_1095Fee,
							"QuarterlyFee":user[0].QuarterlyFee,
							"NewHireFee":user[0].NewHireFee,
							"DirectAgencyFee":user[0].DirectAgencyFee,
							"ApplicantJobFee":user[0].ApplicantJobFee,
							"IntegratedDocFee":user[0].IntegratedDocFee,
							"SSNFee":user[0].SSNFee,
							"EverifyFee":user[0].EverifyFee,
							"JC1":user[0].JCCost1,
							"JC2":user[0].JCCost2,
							"JC3":user[0].JCCost3,
							"JC4":user[0].JCCost4,
							"JC5":user[0].JCCost5,
							"JC6":user[0].JCCost6,
							"WC1":user[0].WCPCost1,
							"WC2":user[0].WCPCost2,
							"WC3":user[0].WCPCost3,
							"WC4":user[0].WCPCost4,
							"WC5":user[0].WCPCost5,
							"WC6":user[0].WCPCost6,
							"OVM1":user[0].OVMCost1,
							"OVM2":user[0].OVMCost2,
							"OVM3":user[0].OVMCost3,
							"OVM4":user[0].OVMCost4,
							"OVM5":user[0].OVMCost5,
							"OVM6":user[0].OVMCost6,
							"CP1":user[0].CPCost1,
							"CP2":user[0].CPCost2,
							"CP3":user[0].CPCost3,
							"CP4":user[0].CPCost4,
							"CP5":user[0].CPCost5,
							"CP6":user[0].CPCost6,
							"ACACostPer":user[0].ACA_Price,
							"ClockTotal":user[0].TotalClockPrice,
							"ClockPrice1":user[0].TimeClockPrice1,
							"ClockPrice2":user[0].TimeClockPrice2,
							"Cobra1":user[0].CobraCost1,
							"Cobra2":user[0].CobraCost2,
							"Cobra3":user[0].CobraCost3,
							"Cobra4":user[0].CobraCost4,
							"Cobra5":user[0].CobraCost5,
							"Cobra6":user[0].CobraCost6,
							"CobraSU1":user[0].CobraSU1,
							"LaborSU1":user[0].LaborPosterSU1,
							"LaborSU2":user[0].LaborPosterSU2,
							"LaborSU3":user[0].LaborPosterSU3,
							"LaborSU4":user[0].LaborPosterSU4,
							"LaborSU5":user[0].LaborPosterSU5,
							"LaborSU6":user[0].LaborPosterSU6,
							"LaborLaw1":user[0].LaborPosterCost1,
							"LaborLaw2":user[0].LaborPosterCost2,
							"LaborLaw3":user[0].LaborPosterCost3,
							"LaborLaw4":user[0].LaborPosterCost4,
							"LaborLaw5":user[0].LaborPosterCost5,
							"LaborLaw6":user[0].LaborPosterCost6,
		}
};

	var r = request.post(options);

	r.on('response',  function (res) {

		  var filename,
        contentDisp = res.headers['content-disposition'];
    if (contentDisp && /^attachment/i.test(contentDisp)) {
        filename = contentDisp.toLowerCase()
            .split('filename=')[1]
            .split(';')[0]
            .replace(/"/g, '');
    } else {
        //filename = path.basename(url.parse(fileUrl).path);
    }
   // console.log(filename);
    //r.pipe(fs.createWriteStream(path.join(__dirname, filename)));
		r.pipe(fs.createWriteStream('final.pdf'));
	    console.log('document has been merged now');

	});


}
else{
	console.log("no record");
}
}
app.get('/',function(req,res){
	res.sendFile('public/index.html' , { root : __dirname});
    get_token();
});

app.post('/insert',function(req,res){

	var data=req.body;
	res.send('thanx for submitting information');
	//console.log(token);
	 get_data(token);
   // put_data(data,token);


})
app.listen(8000, function () {
    console.log('Example app listening on port 3000!')
})
