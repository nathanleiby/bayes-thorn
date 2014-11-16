import unittest
import os

import extract_prices

class TestEnvConfig(unittest.TestCase):

  def setUp(self):
    pass

  def tearDown(self):
    pass

  def test_extract_prices(self):
    # if the number matches the age, skip that
    # if the number says per hour, that's a hint
    # basically, give me posts that have prices
    examples = [
      {
        'text' : "Hello world",
        'prices' : []
      },
      {
        'text' : "Hello world $5.00 is the price",
        'prices' : [5.0]
      },
      {
        'text' : "Hello world yeah 5.00$ I said",
        'prices' : [5.0]
      },
      # {
      #   'text' : "Hello world 5.00 no dollar sign",
      #   'prices' : [5.0]
      # },
      {
        # no prices, but other mistake signals
        'text' : "27 year old Italian doll...Call me over and enjoy my company.don't be shy don't hesitate my time is never a waiste of time. You will love every second, minute and hours that you spend with me. My goal is to satisfy your every need and to leave you relaxed and wanting more.your almost there just call, Fetish friendly,party friendly. And don't forget to ask about my special ;-).    For the upscale gentlement  9174884293 Exclusivedolls4u@gmail. Com  Just minutes away /outcall availableMicrosoft.SqlServer.Dts.Pipeline.BlobColumn",
        'prices' : []
      },
      {
        'text' : "LLAMAME PAPI 347 773 9818 SOY ECUATORINANA SERRANITA Y NUEVA EN ESTA AVENTURA Y QUIERO DEVUTAR CONTIGO SOLO DELIVER EN QUEENS PREGUNTA X SHOANA OK DELIVER EN QUEENS ONLY OUT CALLMicrosoft.SqlServer.Dts.Pipeline.BlobColumn",
        'prices' : []
      }
    ]

    for e in examples:
      actual = extract_prices.get_prices(e['text'])
      expected = e['prices']
      self.assertItemsEqual(actual, expected, "expected {}, got {}".format(expected, actual))


