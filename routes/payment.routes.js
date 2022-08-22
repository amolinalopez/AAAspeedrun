const { default: axios } = require("axios");

const router = require("express").Router();
//❗ SDK CYBERSOURCE 
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cybersourceRestApi = require('cybersource-rest-client');

// common parameters
const AuthenticationType = 'http_signature';
const RunEnvironment = 'cybersource.environment.SANDBOX';
const MerchantId = 'aaarun0001';

// http_signature parameters
const MerchantKeyId = 'c6956433-d150-4080-8fad-90612e2cdee6';
const MerchantSecretKey = 'U0NT3Rz6E3B7OncVFSgIyJmIT2of8hmPY7yC/cizAFM=';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testrest';
const KeyAlias = 'testrest';
const KeyPass = 'testrest';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = '../log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes


var configObj = {
	'authenticationType': AuthenticationType,	
	'runEnvironment': RunEnvironment,

	'merchantID': MerchantId,
	'merchantKeyId': MerchantKeyId,
	'merchantsecretKey': MerchantSecretKey,
    
	'keyAlias': KeyAlias,
	'keyPass': KeyPass,
	'keyFileName': KeyFileName,
	'keysDirectory': KeysDirectory,
    
	'enableLog': EnableLog,
	'logFilename': LogFileName,
	'logDirectory': LogDirectory,
	'logFileMaxSize': LogfileMaxSize
};router.get('/checkout', function (req, res) {

  try {
          var instance = new cybersourceRestApi.KeyGenerationApi(configObj);

          var request = new cybersourceRestApi.GeneratePublicKeyRequest();
          request.encryptionType = 'RsaOaep256';
          request.targetOrigin = 'http://localhost:3000';

          var opts = [];
          opts['format'] = 'JWT';

          console.log('\n*************** Generate Key ********************* ');
          
          instance.generatePublicKey(request, opts, function (error, data, response) {
              if (error) {
                  console.log('Error : ' + error);
                  console.log('Error status code : ' + error.statusCode);
              }
              else if (data) {
                  console.log('Data : ' + JSON.stringify(data));
                  console.log('CaptureContext: '+data.keyId);
                  res.render('index', { keyInfo: JSON.stringify(data.keyId)});
              }
              console.log('Response : ' + JSON.stringify(response));
              console.log('Response Code Of GenerateKey : ' + response['status']);
              callback(error, data);
          });
          
      } catch (error) {
          console.log(error);
      }
    
});
// THIS REPRESENTS THE SERVER-SIDE REQUEST TO MAKE A PAYMENT WITH THE TRANSIENT
// TOKEN
router.post('/receipt', function (req, res) {

  var tokenResponse = JSON.parse(req.body.flexresponse)
  console.log('Transient token for payment is: ' + JSON.stringify(tokenResponse));

   try {
          
          var instance = new cybersourceRestApi.PaymentsApi(configObj);

          var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
          clientReferenceInformation.code = 'test_flex_payment';

          var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
          processingInformation.commerceIndicator = 'internet';

          var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
          amountDetails.totalAmount = '3.99';
          amountDetails.currency = 'USD';

          var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
          billTo.country = 'US';
          billTo.firstName = 'John';
          billTo.lastName = 'Deo';
          billTo.phoneNumber = '4158880000';
          billTo.address1 = 'test';
          billTo.postalCode = '94105';
          billTo.locality = 'San Francisco';
          billTo.administrativeArea = 'MI';
          billTo.email = 'test@cybs.com';
          billTo.address2 = 'Address 2';
          billTo.district = 'MI';
          billTo.buildingNumber = '123';

          var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
          orderInformation.amountDetails = amountDetails;
          orderInformation.billTo = billTo;

          // EVERYTHING ABOVE IS JUST NORMAL PAYMENT INFORMATION
          // THIS IS WHERE YOU PLUG IN THE MICROFORM TRANSIENT TOKEN
          var tokenInformation = new cybersourceRestApi.Ptsv2paymentsTokenInformation();
          tokenInformation.transientTokenJwt = tokenResponse;

          var request = new cybersourceRestApi.CreatePaymentRequest();
          request.clientReferenceInformation = clientReferenceInformation;
          request.processingInformation = processingInformation;
          request.orderInformation = orderInformation;
          request.tokenInformation = tokenInformation;

          console.log('\n*************** Process Payment ********************* ');

          instance.createPayment(request, function (error, data, response) {
              if (error) {
                  console.log('\nError in process a payment : ' + JSON.stringify(error));
              }
              else if (data) {
                  console.log('\nData of process a payment : ' + JSON.stringify(data));
                  res.render('receipt', { paymentResponse:  JSON.stringify(data)} );
          
              }
              console.log('\nResponse of process a payment : ' + JSON.stringify(response));
              console.log('\nResponse Code of process a payment : ' + JSON.stringify(response['status']));
              callback(error, data);
          });
          
      } catch (error) {
          console.log(error);
      }

});

/* GET payment page */
router.get("/payment", (req, res, next) => {
  res.render("payment");
});

router.get("/premium", (req, res, next) => {
  res.render("premium2");
});


router.post("/createContext", (req, res, next) => {
  //
  // Create a server-side context
  //
  // Il s'agit de creer un JWT qui sera utilisé coté client pour créer les chmaps de formulaire
  //
  // https://developer.cybersource.com/docs/cybs/en-us/digital-accept-flex/developer/all/rest/digital-accept-flex/microform-integ/microform-integ-getting-started/creating-server-side-context.html
  //

  axios
    .post("https://apitest.cybersource.com/microform/v2/sessions", {
      targetOrigins: ["http://localhost:3000"],
    })
    .then(function (response) {
      console.log("response=", response);
    })
    .catch(function (err) {
      console.log(err);
      next(err);
    });
});


module.exports = router;
