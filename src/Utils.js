function GetDefaultArg( arg, def )
{
  return ( typeof arg == 'undefined' ? def : arg );
}

function RemoveFromList( array, elem )
{
  var index = array.indexOf( elem );
  if ( index > -1 )
  {
    array.splice( index, 1 );
  }
}

var M_PI = 3.14159265358979323846;

function stripFilePath( filename )
{
  var index = Math.max( filename.lastIndexOf( '/' ), filename.lastIndexOf( '\\' ) );
  return filename.substring( index + 1 );
}

Math.fmod = function( a, b )
{
  return Number( ( a - ( Math.floor( a / b ) * b ) ).toPrecision( 8 ) );
};

Math.degrees = function( rad )
{
  return rad * ( 180 / Math.PI );
};

Math.radians = function( deg )
{
  return deg * ( Math.PI / 180 );
};

var CopyHelper = Class(
{
  constructor: function( fromObj, toObj )
  {
    this.m_fromObj = fromObj;
    this.m_toObj = toObj;
  },
  copy: function( key, defaultVal )
  {
    this.m_toObj[ key ] = this.m_fromObj ? this.m_fromObj[ key ] : defaultVal;
  }
} );

var XMLHelper = Class(
{
  constructor: function( xml )
  {
    this.m_xml = xml;
    this.m_attr = xml.attributes;
  },
  GetAttr: function( attrName )
  {
    var attr = this.m_attr.getNamedItem( attrName );
    return attr ? attr.nodeValue : null;
  },
  GetAttrAsInt: function( attrName )
  {
    return parseInt( this.GetAttr( attrName ) );
  },
  GetAttrAsFloat: function( attrName )
  {
    return parseFloat( this.GetAttr( attrName ) );
  },
  GetAttrAsBool: function( attrName )
  {
    return this.GetAttrAsInt( attrName ) > 0;
  },

  GetChildAttr: function( childName, attrName )
  {
    var childNode = this.m_xml.getElementsByTagName( childName )[ 0 ];
    if ( childNode )
      return GetXMLAttrSafe( childNode, attrName, null );
    return null;
  },

  HasChildAttr: function( attrName )
  {
    return this.GetChildAttr( attrName ) !== null;
  },

  GetChildAttrAsInt: function( attrName )
  {
    return parseInt( this.GetChildAttr( attrName ) );
  },
  GetChildAttrAsBool: function( attrName )
  {
    return this.GetChildAttrAsInt( attrName ) > 0;
  },

} );

function AsInt( x )
{
  return parseInt( x );
}

function AsBool( x )
{
  return x > 0;
}

function GetNodeAttrValue( elem, attrName )
{
  return elem.attributes.getNamedItem( attrName ).nodeValue;
}

function ForEachInXMLNodeList( nodelist, fn )
{
  for ( var i = 0; i < nodelist.length; i++ )
  {
    fn( nodelist[ i ] );
  }
}

function ForEachXMLChild( xmlNode, tag, fn )
{
  var nodelist = xmlNode.getElementsByTagName( tag );
  for ( var i = 0; i < nodelist.length; i++ )
  {
    if ( nodelist[ i ].parentElement == xmlNode )
      fn( nodelist[ i ] );
  }
}

function GetXMLAttrSafe( xmlNode, attrName, defaultResult /* ="" */ )
{
  var attr = xmlNode.attributes ? xmlNode.attributes.getNamedItem( attrName ) : null;
  return attr ? attr.nodeValue : GetDefaultArg( defaultResult, "" );
}

function Lerp( a, b, fract )
{
  return a + fract * ( b - a );
}

// http://stackoverflow.com/questions/521295/javascript-random-seeds
var g_randomSeed = 17;

function RandomUnit()
{
  var x = Math.sin( g_randomSeed++ ) * 10000;
  return x - Math.floor( x );
}

function Random( mag )
{
  return RandomUnit() * mag;
}

function RandomBetween( low, high )
{
  return Lerp( low, high, RandomUnit() );
}

function GetDistance2D( fromx, fromy, tox, toy, fast /*= false*/ )
{
  w = tox - fromx;
  h = toy - fromy;

  if ( GetDefaultArg( fast, false ) )
    return w * w + h * h;
  else
    return Math.sqrt( w * w + h * h );
}

/**
 * Get the direction from 1 point to another
 * Thanks to "Snarkbait" for this little code snippit
 * @return Angle of difference
 */
function GetDirection( fromx, fromy, tox, toy )
{
  // arcus tangens, convert to degrees, add 450 and normalize to 360.
  return Math.fmod( ( Math.atan2( toy - fromy, tox - fromx ) / M_PI * 180.0 + 450.0 ), 360.0 );
}

function loadXMLDoc( filename )
{
  if ( window.XMLHttpRequest )
  {
    xhttp = new XMLHttpRequest();
  }
  else // code for IE5 and IE6
  {
    xhttp = new ActiveXObject( "Microsoft.XMLHTTP" );
  }
  xhttp.open( "GET", filename, false );
  xhttp.send();
  return xhttp.responseXML;
}

function toHex( r, g, b )
{
  return ( ( r << 16 ) + ( g << 8 ) + b );
}
