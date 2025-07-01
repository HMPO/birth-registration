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
    res.redirect('/triage/v1/parental-responsibility')
  } else {
    var Informant = req.session.data['relationshipToChild']
    if (Informant === 'birth-mother') {
      res.redirect('/triage/v1/outcome-single')
    } else {
      res.redirect('/triage/v1/parental-responsibility')
    }
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
    res.redirect('https://signin.account.gov.uk/sign-in-or-create')
  }
})

// Search for NHS record again or search of local regiser office
router.post('*/search-again', function (req, res) {
  var searchAgain = req.session.data['searchAgain']
  if (searchAgain === 'yes') {
    res.redirect('enter-nhs-number')
  } else {
    res.redirect('https://www.gov.uk/register-offices')
  }
})

// Child name routing
router.post('*/child-name-correct', function (req, res) {
  var childNameCorrect = req.session.data['child-name']
  if (childNameCorrect === 'yes') {
    res.redirect('sex')
  } else {
    res.redirect('name-change')
  }
})

// Child sex routing
router.post('*/child-sex-correct', function (req, res) {
  var childSexCorrect = req.session.data['sex-correct']
  if (childSexCorrect === 'yes') {
    res.redirect('place-of-birth')
  } else {
    res.redirect('sex-change')
  }
})

// Child place of birth routing
router.post('*/child-place-of-birth-correct', function (req, res) {
  var childPlaceOfBirth = req.session.data['child-place-of-birth']
  if (childPlaceOfBirth === 'yes') {
    res.redirect('child-details')
  } else {
    res.redirect('place-of-birth-change')
  }
})

// Triage routing for v.2 (start page)
router.post('*/who-registers-outcomes', function (req, res) {
  var WhoRegistersOutcomes = req.session.data['who-registers']
  if (WhoRegistersOutcomes === 'marrried')  { res.redirect('outcome-married') }
  else if (WhoRegistersOutcomes === 'unmarrried') { res.redirect('outcome-unmarried') } 
  else if (WhoRegistersOutcomes === 'single-mother') { res.redirect('outcome-single') }
  else { res.redirect('outcome-other') }       
})

// Triage routing for v.2 (after OneLogin)
router.post('*/are-you-married2', function (req, res) {
  var whoIsTheInformant2 = req.session.data['relationshipToChild']
  if (whoIsTheInformant2 === 'someone-else') {
    res.redirect('outcome-other')
  } else {
    res.redirect('are-you-married')
  }
})

// Show different pages based on value of areYouMarried
router.post('*/registering-other-parent2', function (req, res) {
  var MarriedOrInPartnership2 = req.session.data['areYouMarried']
  if (MarriedOrInPartnership2 === 'yes') {
    res.redirect('../find-nhs-record')
  } else {
    var Informant = req.session.data['relationshipToChild']
    if (Informant === 'birth-mother') {
      res.redirect('registering-other-parent')
    } else {
      res.redirect('enter-email')
    }
  }
})

// Show different pages based on value of registeringOtherParent
router.post('*/enter-email', function (req, res) {
  var registeringOtherParent2 = req.session.data['registeringOtherParent']
  if (registeringOtherParent2 === 'yes') {
    res.redirect('enter-email')
  } else {
    res.redirect('../find-nhs-record')
  }
})

// Show different pages after email based on value of relationshipToChild - who is the other parent or nothing
router.post('*/who-is-the-other-parent', function (req, res) {
  var whoIsTheOtherParent = req.session.data['relationshipToChild']
  if (whoIsTheOtherParent === 'birth-mother') {
    res.redirect('who-is-the-other-parent')
  } else {
    res.redirect('../find-nhs-record')
  }
})

// Show different pages if mother changes address since birth
router.post('*/mother-changed-address', function (req, res) {
  var didMotherChangedAddress = req.session.data['address-changed']
  if (didMotherChangedAddress === 'Yes') {
    res.redirect('address-current-search')
  } else {
    res.redirect('job-role')
  }
})