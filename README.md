# tc39-times

## Usage

You can run the tool on any computer with `npm` installed by running the following command

```sh
npx git+https://git.disroot.org/ryzokuken/tc39-times.git <date> <timezone>
```

### Local Usage

If you have a local checkout of the script on your computer, you can run it by executing the following in the project directory

```sh
node index.mjs <date> <timezone>
```

### Example

```sh
node index.mjs 2023-05-15 "America/Chicago"
```

#### Example Output

```txt
2023-05-15

8:00 AM to 10:00 AM PDT
10:00 AM to 12:00 PM CDT
16:00 to 18:00 BST
17:00 to 19:00 CEST

11:00 AM to 1:00 PM PDT
1:00 PM to 3:00 PM CDT
19:00 to 21:00 BST
20:00 to 22:00 CEST

2023-05-16

8:00 AM to 10:00 AM PDT
10:00 AM to 12:00 PM CDT
16:00 to 18:00 BST
17:00 to 19:00 CEST

11:00 AM to 1:00 PM PDT
1:00 PM to 3:00 PM CDT
19:00 to 21:00 BST
20:00 to 22:00 CEST

2023-05-17

8:00 AM to 10:00 AM PDT
10:00 AM to 12:00 PM CDT
16:00 to 18:00 BST
17:00 to 19:00 CEST

11:00 AM to 1:00 PM PDT
1:00 PM to 3:00 PM CDT
19:00 to 21:00 BST
20:00 to 22:00 CEST

2023-05-18

8:00 AM to 10:00 AM PDT
10:00 AM to 12:00 PM CDT
16:00 to 18:00 BST
17:00 to 19:00 CEST

11:00 AM to 1:00 PM PDT
1:00 PM to 3:00 PM CDT
19:00 to 21:00 BST
20:00 to 22:00 CEST
```
