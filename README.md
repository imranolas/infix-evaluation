# Calculator Task

Setup a simple web service to implement a calculator. The service must offer an endpoint that reads a string input and parses it. It should return either a HTTP error code or a solution for the calculation in JSON form.

== API Description ==

- Endpoint:
  * GET /calculus?query=[input]
  * The input can be expected to be UTF-8 with BASE64 encoding
An example of calculus query:
- Original query: 2 * (23/(3*3))- 23 * (2*3)
- With encoding: MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk=
  * Return:
    - On success: JSON response of format:
      { error: false, result: number }
    - On error: Either a HTTP error code or:
      { error: true, message: string }

- Supported operations: + - * / ( )

== Technical constraints ==

You can choose your favourite technologies to set this exercise up. There are a few constraints, however. These are divided into two groups: required and recommended. You have to follow the required constraints, but you can regard the recommended constraints as tips or ideas.

Required:
- The API has to accept the input format given in the example above, or a useful subset if you run out of time
- The API has to be testable online from Futurice office.
- The source code should be shared on GitHub, either on public repository or a repository that Futurice can access.

Recommended:
- Heroku is a good place to publish your service
- You might want to google "Reverse Polish Notation" for inspiration (but the input should be in infix format)

== Optional task ==
- You may also add a web UI that uses the API if you have time

== End of task description ==
