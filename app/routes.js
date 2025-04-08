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