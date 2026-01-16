# tc39-times

## Usage

You can run the tool on any computer with `npm` installed by running the following command

```sh
npx github:ctcpip/tc39-times <date> <timezone> <virtual|hybrid>
```

### Local Usage

If you have a local checkout of the script on your computer, you can run it by executing the following in the project directory

```sh
node index.mjs <date> <timezone> <virtual|hybrid>
```

### Example

```sh
node index.mjs 2023-09-26 Asia/Tokyo hybrid
```

#### Example Output

```txt
2023-09-26

18:00-20:00 PDT
20:00-22:00 CDT
02:00-04:00 BST
03:00-05:00 CEST

21:00-23:00 PDT
23:00-01:00 CDT
05:00-07:00 BST
06:00-08:00 CEST

23:00-01:00 PDT
01:00-03:00 CDT
07:00-09:00 BST
08:00-10:00 CEST

2023-09-27

18:00-20:00 PDT
20:00-22:00 CDT
02:00-04:00 BST
03:00-05:00 CEST

21:00-23:00 PDT
23:00-01:00 CDT
05:00-07:00 BST
06:00-08:00 CEST

23:00-01:00 PDT
01:00-03:00 CDT
07:00-09:00 BST
08:00-10:00 CEST

2023-09-28

18:00-20:00 PDT
20:00-22:00 CDT
02:00-04:00 BST
03:00-05:00 CEST

21:00-23:00 PDT
23:00-01:00 CDT
05:00-07:00 BST
06:00-08:00 CEST

23:00-01:00 PDT
01:00-03:00 CDT
07:00-09:00 BST
08:00-10:00 CEST

2023-09-29

18:00-20:00 PDT
20:00-22:00 CDT
02:00-04:00 BST
03:00-05:00 CEST

21:00-23:00 PDT
23:00-01:00 CDT
05:00-07:00 BST
06:00-08:00 CEST

23:00-01:00 PDT
01:00-03:00 CDT
07:00-09:00 BST
08:00-10:00 CEST
```
