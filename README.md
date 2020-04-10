# Realistic Refactoring in React

## Motivation

I strongly agree with Kent Beck's recommendation of first making the change easy, and then making the easy change.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">for each desired change, make the change easy (warning: this may be hard), then make the easy change</p>&mdash; Kent Beck (@KentBeck) <a href="https://twitter.com/KentBeck/status/250733358307500032?ref_src=twsrc%5Etfw">September 25, 2012</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

I also strongly agree with Kent C. Dodd's thoughts about testing implementation details.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Testing implementation details is a recipe for disaster.<br><br>Do yourself a favor and give react-testing-library a solid try. Your future self will thank your present self <a href="https://t.co/iMU4gcj8aP">https://t.co/iMU4gcj8aP</a> 🐐</p>&mdash; Kent C. Dodds 🧑‍🚀 (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1037855652985495552?ref_src=twsrc%5Etfw">September 7, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Additionally, I try to make my code resemble documentation code as much as possible. However, documentation code is often updated and refactored much faster and more frequently than production code.

I hope this series of branches demonstrates my attempts to get an app working, add tests, and then incrementally improve the app without having to significantly change my tests.

### Agenda

1. Configuration
   - Prettier
   - Format script
1. Get it working with no dependencies
   - Regular HTML and native `fetch`
1. Add tests
   - Testing library
1. Separate data and UI
   - Extract presentational components
1. Reskin UI
   - Replace regular HTML with Bootstrap
1. Update API client
   - Replace native `fetch` with Apollo Client
1. Refactor
   - Replace class components with hooks
