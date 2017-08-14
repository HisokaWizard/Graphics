������� �����, � �������������� ���������: knockout, durandal, bootstrap, select2, ����������� ����������� ������ �� ������ �������������. �� ������ ��������� � � ������� ������ ���������� �������������� 
JSON �������, � ������������ � ����������. � �������� ������� ����� �������� ��� ��� ����������� � ��. 
����� ���������� rest ������ ��� �������������� �� ������, ������, ����� � ������������:
searchCountries Request
{
  search: string,
  start: integer,
  length: integer
}
searchCountries Response
{
  data: [{
	name: string,
	id: integer
  }, �],
  recordsTotal: integer
}
������ ����� ����� ���������� ��������, �� ������ ������. ������ ������ ������������� �� ��������, ��� ���� ������ � ������ important ������ ���������� ����.
searchCities Request
{
        countryId: integer,
        search: string,
        start: integer,
        length: integer
}
searchCities Response
{
  data: [{
        id: integer
	   name: string,
        important: boolean,
        area: string,
        region: string,
        country: string, // country code
        countryId integer,
  }, �],
  recordsTotal: integer
}
searchUniversities Request
{
  cityId: integer,
  search: string,
  start: integer,
  length: integer
}
searchUniversities Response
{
  data: [{
	name: string,
	id: integer,
        cityId: integer
  }, �],
  recordsTotal: integer
}
searchSchools Request
{
  cityId: integer,
  search: string,
  start: integer,
  length: integer
}
searchSchools Response
{
  data: [{
	name: string,
	id: integer,
     cityId: integer
  }, �],
  recordsTotal: integer
}
��� ���������� �������������� ������������ select, � �������: "������ id", "�������", "����������� �����". � ������, ����� ������ ����������� ����� � ������������ �������������� ����������� ������ (��. �������).
 
�������� ����� ������������� ���� �� ���������������, ������ �������������, ���� �� ������ ���������:
������� 3.1 ���������� �������� �������� ���������� � ����� ��
��������	������������	��������� ������
�������������� 	ids	[integer]
���� �������������	screenNames	[string]
���, �������� �����	query	string
�������������� ������	��� ������	countryCode	ccode
	������������� ������ (��� ������������)	countryId	integer
	������������� ������ 	cityId	integer
������� ���������	�����	school	������� 1.15 �����, �����������

	�����������	university	������� 1.15 �����, �����������

�������	������ �������	ageFrom	integer
	������� �������	ageTo	integer
	���� ��������	birthdate	date
			
			
���	gender	������� 1.11 ���

������	�������� ��������	companyName	string
	�������� ���������	jobName	string
������������� ������, � ������� ������� ������������	groupId	integer
��������� ������ ������������	friendLists	boolean
��������� ���������� �� �������� ������������	counters	boolean
������ ������������	friends	������� 1.3 �������� ����������� �������� ��� �������������

���������� ������������	followers	������� 1.3 �������� ����������� �������� ��� �������������

������������ ������������	relatives	������� 1.3 �������� ����������� �������� ��� �������������

������� 1.15 �����, �����������
����	������������	��������� ������
��� ������	countryCode	ccode
�������� ������	cityName	string
�������� 	name	string
������������� (��� �������� id ��������� ��������� ������������)	id	string
������� 1.11 ���
������������	��������
�� ������	null
�������	m
�������	f
������� 1.3 �������� ����������� �������� ��� �������������
��������	������������	��������� ������
��������� ������ ������������
(��, ��, Twitter, ��)	friends	������� 1.3 �������� ����������� �������� ��� �������������

��������� ������������� ������������
(��, ��)	relatives	������� 1.3 �������� ����������� �������� ��� �������������

��������� ����������� ������������ (��, Twitter, ��)	followers	������� 1.3 �������� ����������� �������� ��� �������������

��������� ������ �������������� �������������	onlyIds	boolean
��������� ���������� ������������	photo	boolean
��������� ������� ���������� ������������	photoLarge	boolean 
������������ ���������� �������������, ����������� �� ������� �������� (��������, ������ 100 ������ ��� ������ 100 ������ ����������)	limit	integer

