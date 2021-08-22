const users = [
  {
    name: 'Patrick Monteiro',
    age: 18,
    country: 'Brazil'
  },
  {
    name: 'Luiz Patel',
    age: 22,
    country: 'Indian'
  },
  {
    name: 'Arnold Smith',
    age: 30,
    country: 'EUA'
  },
  {
    name: 'Airton Senna',
    age: 30,
    country: 'Brazil'
  },
  {
    name: 'Ronaldo Fenomeno',
    age: 30,
    country: 'Brazil'
  },
  {
    name: 'Ronaldinho Gaucho',
    age: 30,
    country: 'Brazil'
  },
  {
    name: 'Cristiano Ronaldo',
    age: 30,
    country: 'Portugal'
  }
]

const chat = [
  {
    name: 'Mary Jane',
    type: 'send',
    text: ['Hi']
  },
  {
    name: 'Arnold Smith',
    type: 'received',
    text: ['Hi, how are you ?']
  },
  {
    name: 'Mary Jane',
    type: 'send',
    text: ['Im fine!']
  }
]

const traffic = [
  {
    channel: 'Facebook',
    sessions: '9121',
    rate: '9090',
    percentage: 0.5,
    color: 'blue-7'
  },
  {
    channel: 'Email',
    sessions: '1933',
    rate: '938',
    percentage: 0.9,
    color: 'grey-7'
  },
  {
    channel: 'Instagram',
    sessions: '1400',
    rate: '282',
    percentage: 0.7,
    color: 'red-6'
  },
  {
    channel: 'SMS',
    sessions: '300',
    rate: '272',
    percentage: 0.4,
    color: 'green-6'
  },
  {
    channel: 'Site',
    sessions: '110',
    rate: '28',
    percentage: 0.3,
    color: 'purple-6'
  }
]

export {
  users,
  chat,
  traffic
}
