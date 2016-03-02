import os

from twisted.internet import reactor

from twisted.web.server import Site
from twisted.web.static import File

# constants

SERVER_HTTP_PORT = 9001
SERVER_HTTP_RESOURCES = '.'

if __name__ == '__main__':

  # http setup

  webdir = os.path.abspath(SERVER_HTTP_RESOURCES)
  site = Site(File(webdir))
  reactor.listenTCP(SERVER_HTTP_PORT, site)

  # start session

  reactor.run()
