/* * * * * * * * * * * * * * * * * * * * *
 * Connection String to Oracle Database  *
 * * * * * * * * * * * * * * * * * * * * */

/*
 * Connection string
 * sqlplus 'cis550project@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=cis-550-project.ccgsmtzjingg.us-east-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))'
 * password: susandavidson
 *
 * EZCONNECT
 * CONNECT cis550project/susandavidson@//cis-550-project.ccgsmtzjingg.us-east-2.rds.amazonaws.com:1521
 */

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * SQL Queries to Answer Questions from Milestone 1*
 * * * * * * * * * * * * * * * * * * * * * * * * * */

/*
 * Query 1: If I prioritize raising a family (education and crime), where is
 * the best city to raise a family?
 */

 SELECT C.name
 FROM County C JOIN Map M ON C.id = Map.fips
               JOIN State S ON S.abbr = Map.state_abbr
 ORDER BY C.crime, S.act_score

/*
 * Query 2: If I want to buy a new vacation home (sunny weather, low crime,
 * wealthy neighbors) where should I be looking?
 */

 SELECT Y.name
 FROM City Y JOIN Map M ON Y.cbsa_name = M.cbsa_name
 ORDER BY Y.crime_metro, Y.precipitation

/*
 * Query 3(a) (Updated): Which cities have had continually increasing prices
 * from 2015-2019?
 */

  WITH Increases AS (
    SELECT H2.fips, H2.year
    FROM Housing H1 JOIN Housing H2 ON (H1.year + 1) = H2.year
    WHERE H2.fmr2 > H1.fmr2
  )
  SELECT I.fips
  FROM Increases I
  GROUP BY I.fips
  HAVING COUNT(*) = 4

/*
 * Query 3(b) (Updated): Which cities have had continually decreasing prices
 * from 2015-2019?
 */

   WITH Decreases AS (
     SELECT H2.fips, H2.year
     FROM Housing H1 JOIN Housing H2 ON (H1.year + 1) = H2.year
     WHERE H2.fmr2 < H1.fmr2
   )
   SELECT D.fips
   FROM Decreases I
   GROUP BY D.fips
   HAVING COUNT(*) = 4

/*
 * Query 3(c) (Updated): Order counties by the number of average annual
 * rent increases.
 */

  WITH Increases AS (
    SELECT H2.fips, H2.year
    FROM Housing H1 JOIN Housing H2 ON (H1.year + 1) = H2.year
    WHERE H2.fmr2 > H1.fmr2
  )
  SELECT I.fips, COUNT(*) as num_increases
  FROM Increases I
  GROUP BY I.fips
  ORDER BY num_increases DESC

/*
 * Query 4 (Updated): Find the lowest crime city in each state.
 * NOTE: The original query was "QHow can I find corresponding cities within s
 * states that I align with?" We plan to create queries based on preset filters
 * like "Lowest Crime", "Lowest Unemployment", "Least Rain", etc. This is an
 * example of one such query (e.g. "Lowest Crime")
 */

  WITH MinCrimes AS (
    SELECT Y.state, min(Y.crime) as min_crime
    FROM City Y
    GROUP BY Y.state
  )
  SELECT C.state, C.cbsa_name
  FROM City C JOIN MinCrimes M ON C.state_abbr = M.state_abbr
  WHERE C.crime = M.min_crime

/*
 * Query 5: Where can I relocate to be with similar people to me
 * (wealth, education)?
 * NOTE: Pull the values in the HAVING clause and the attributes in the GROPUBY
 *       clause from sliders on the front end. Currently, query is written with
 *       placeholder values
 */

 SELECT C.name, C.unemployment, Y.crime_metro, S.act_score
 FROM County C JOIN Map M ON C.id = M.fips
               JOIN City Y ON Y.cbsa_name = M.cbsa_name
               JOIN State S ON S.state_abbr = M.state_abbr
 GROUP BY C.unemployment, Y.crime_metro, S.act_score
 HAVING C.uemployment < 10.0 AND Y.crime_metro < 5000 AND S.act_score > 24
 ORDER BY C.unemployment DESC
