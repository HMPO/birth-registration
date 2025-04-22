//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

// Show different pages based on value of whereChildWasBorn 
router.post('*/relationship-to-child', function (req, res) {
  var whereChildBorn = req.session.data['whereChildWasBorn']
  if (whereChildBorn === 'abroad') {
    res.redirect('https://www.gov.uk/register-birth-abroad')
  } else if (whereChildBorn === 'scotland') {
    res.redirect('https://www.nrscotland.gov.uk/registration/registering-a-birth/')
  } else if (whereChildBorn === 'northern-ireland') {
        res.redirect('https://www.nidirect.gov.uk/information-and-services/births-deaths-marriages-and-civil-partnerships/births-and-registration')  
  } else {
    res.redirect('/triage/v1/relationship-to-child')
  }
})

// Show different pages based on value of relationshipToChild
router.post('*/are-you-married', function (req, res) {
  var whoIsTheInformant = req.session.data['relationshipToChild']
  if (whoIsTheInformant === 'someone-else') {
    res.redirect('/triage/v1/outcome-other')
  } else {
    res.redirect('/triage/v1/are-you-married')
  }
})

// Show different pages based on value of areYouMarried
router.post('*/registering-other-parent', function (req, res) {
  var MarriedOrInPartnership = req.session.data['areYouMarried']
  if (MarriedOrInPartnership === 'yes') {
    res.redirect('/triage/v1/outcome-married')
  } else {
    var Informant = req.session.data['relationshipToChild']
    if (Informant === 'birth-mother') {
      res.redirect('/triage/v1/registering-other-parent')
    } else {
      res.redirect('/triage/v1/parental-responsibility')
    }
  }
})

// Show different pages based on value of registeringOtherParent
router.post('*/outcome-single', function (req, res) {
  var otherParent = req.session.data['registeringOtherParent']
  if (otherParent === 'yes') {
    res.redirect('/triage/v1/outcome-unmarried')
  } else {
    res.redirect('/triage/v1/outcome-single')
  }
})

// Show different pages based on value of parental-responsibility
router.post('*/outcome-married', function (req, res) {
  var parentalResponsibilityDoc = req.session.data['parentalResponsibility']
  if (parentalResponsibilityDoc === 'yes') {
    res.redirect('/triage/v1/outcome-married')
  } else {
    res.redirect('/triage/v1/outcome-unmarried')
  }
})

// Take user to OneLogin or find your local council page
router.post( '/', function (req, res) {
  var registrationChannel = req.session.data['registerMethod']
  if (registrationChannel === 'inPerson') {
    res.redirect('https://www.gov.uk/register-offices')
  } else {
    res.redirect('https://www.gov.uk/using-your-gov-uk-one-login')
  }
})

