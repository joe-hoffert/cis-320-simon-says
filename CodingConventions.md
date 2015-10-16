# Proposed Conventions #

  * The beginning of every statement must be indented by a multiple of 4 spaces (not tabs).
  * If a statement needs to be continued on the next line, it should be indented by exactly one additional space.
  * Every statement should end with a semicolon.
  * There should be no spaces immediately before or after a parenthesis, bracket, or brace.
  * All strings should be in double quotes unless there is a good reason for single quotes.
  * Variable names should be in `lowerCamelCase`.
  * Class names (if we create any) should be in `UpperCamelCase`.
  * The `const` keyword **must not** be used. Internet Explorer 10 doesn't support it. Use `var` instead.

# Commit Log Conventions #
  * For user stories, use "US" + cycle + ":" + user story number (e.g. US3:2)
  * For unit tests, use "UT" + cycle + ":" + user story number (e.g. UT3:2)
  * For integration tests, use "IT" + cycle + ":" + user story number (e.g. IT3:2)
  * For bugs/issues, use "B" followed by issue ID (e.g. B7)
  * For Wiki updates, use "W" + cycle (W2)